import { defineStore } from 'pinia'
import { ref , reactive, computed, watch} from 'vue'
import { createList as apiCreateList } from '@/api/lists' 

export type Todo = { id: number; title: string; done: boolean }
export type TodoList = { name: string; todos: Todo[]; serverId?: number | string }

function reactiveTodoList(name: string, todos: Todo[] = []) {
  return reactive<TodoList>({ name, todos })
}
type RTodoList = ReturnType<typeof reactiveTodoList>

export const useMultiTodoStore = defineStore('multiTodo', () => {
  const lists = ref<Record<number, RTodoList>>({})
  const listIds = ref<number[]>([])

  const getList = (listId: number) => (lists.value[listId] ??= { name: '', todos: [] })

  const remainingMap = computed<Record<number, number>>(() => {
    const out: Record<number, number> = {}
    for (const id of listIds.value) {
      const l = lists.value[id]
      out[id] = l ? l.todos.filter(t => !t.done).length : 0
    }
    return out
  })

  const lastDeltaMsg = ref<string | null>(null)
  const prevRemaining = ref<Record<number, number>>({})
  watch(remainingMap, (nv, ov) => {
    const old = ov ?? prevRemaining.value
    if (!old) return

    // 直近で変化したリストのみを抽出
    const changedIds = Object.keys(nv).filter(
      id => (nv[+id] ?? 0) !== (old[+id] ?? 0)
    )

    // 1件も変化がなければ終了
    if (!changedIds.length) return

    // 変更されたリストのうち、最後に操作された（更新時刻が新しい）ものだけを対象にする
    // → store 内で "lastUpdatedListId" を更新しているならそれを優先的に利用
    // そうでなければ、ここでは「最後の変更ID」を採用
    const lastChangedId = Number(changedIds[changedIds.length - 1])

    const diff =
      (nv[lastChangedId] ?? 0) - (old[lastChangedId] ?? 0)

    const listName =
      lists.value[lastChangedId]?.name ?? `List#${lastChangedId}`

    lastDeltaMsg.value =
      diff > 0
        ? `${listName} の未完了が ${diff} 件増加`
        : `${listName} の未完了が ${-diff} 件減少`

    // 次回比較用に最新値を保持
    prevRemaining.value = structuredClone(nv)
    },
    { deep: true }
  )

  function createList(name: string) {
    const next = (listIds.value[listIds.value.length - 1] ?? 0) + 1
    listIds.value.push(next)
    lists.value[next] = { name: name.trim() || `List${next}`, todos: [] }
    return next
  }

  async function createListRemote(name: string) {
    const res = await apiCreateList(name)        // { id: 173..., name: '...' } など
    const last = listIds.value.length ? listIds.value[listIds.value.length - 1]! : 0
    const next = last + 1                        // ← ローカルID（小さい連番）
    listIds.value.push(next)
    lists.value[next] = {
      name: (res.name ?? name).trim() || `List${next}`,
      todos: [],
      serverId: res.id,                          // ← ここで型OKになる
    }
    return next
  }

  function add(listId: number, title: string) {
    const t = title.trim()
    if (!t) return
    const arr = getList(listId).todos
    const nextId = arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1
    arr.push({ id: nextId, title: t, done: false })
  }

  function toggle(listId: number, id: number) {
    const x = getList(listId).todos.find(t => t.id === id)
    if (x) x.done = !x.done
  }

  function remove(listId: number, id: number) {
    lists.value[listId]!.todos = getList(listId).todos.filter(t => t.id !== id)
  }

  function clear(listId: number) {
    lists.value[listId]!.todos = []
  }

  function cleanup() {
    for (const id of Object.keys(lists.value)) {
      const listId = Number(id)
      lists.value[listId]!.todos = getList(listId).todos.filter(t => !t.done)
    }
    console.log('🧹 Cleanup: 全リストの完了済みTodoを削除しました')
  }

  function removeList(listId: number) {
    delete lists.value[listId]                // 実際のTodoデータを削除
    listIds.value = listIds.value.filter(id => id !== listId) // ID一覧からも除外
  }

  return { lists, listIds, getList, createList,createListRemote, add, toggle, remove, clear, cleanup, removeList , remainingMap, lastDeltaMsg}
}, {
  persist: true
})
