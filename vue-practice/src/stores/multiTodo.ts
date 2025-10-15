import { defineStore } from 'pinia'
import { ref , reactive, computed, watch} from 'vue'

export type Todo = { id: number; title: string; done: boolean }
export type TodoList = { name: string; todos: Todo[] }

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
  watch(remainingMap, (nv, ov) => {
    // 初回は ov が空なのでスキップ
    if (!ov) return
    for (const id of Object.keys(nv)) {
      const nid = Number(id)
      const diff = (nv[nid] ?? 0) - (ov[nid] ?? 0)
      if (diff !== 0) {
        lastDeltaMsg.value =
          diff > 0 ? `List#${nid} の未完了が ${diff} 件増加` : `List#${nid} の未完了が ${-diff} 件減少`
      }
    }
  })

  function createList(name: string) {
    const next = (listIds.value[listIds.value.length - 1] ?? 0) + 1
    listIds.value.push(next)
    lists.value[next] = { name: name.trim() || `List${next}`, todos: [] }
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

  return { lists, listIds, getList, createList, add, toggle, remove, clear, cleanup, removeList , remainingMap, lastDeltaMsg}
}, {
  persist: true
})
