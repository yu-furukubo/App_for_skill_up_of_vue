import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Todo = { id: number; title: string; done: boolean }

export const useMultiTodoStore = defineStore('multiTodo', () => {
  // key: listId, value: Todo[]
  const lists = ref<Record<number, Todo[]>>({})
  const listIds = ref<number[]>([])

  const getList = (listId: number) => (lists.value[listId] ??= [])

  function createList() {
    const next = (listIds.value[ listIds.value.length - 1 ] ?? 0) + 1
    listIds.value.push(next)
    lists.value[next] = []
    return next
  }

  function add(listId: number, title: string) {
    const t = title.trim()
    if (!t) return
    const arr = getList(listId)
    const nextId = arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1
    arr.push({ id: nextId, title: t, done: false })
  }

  function toggle(listId: number, id: number) {
    const x = getList(listId).find(t => t.id === id)
    if (x) x.done = !x.done
  }

  function remove(listId: number, id: number) {
    lists.value[listId] = getList(listId).filter(t => t.id !== id)
  }

  function clear(listId: number) {
    lists.value[listId] = []
  }

  function cleanup() {
    for (const id of Object.keys(lists.value)) {
      const listId = Number(id)
      lists.value[listId] = getList(listId).filter(t => !t.done)
    }
    console.log('🧹 Cleanup: 全リストの完了済みTodoを削除しました')
  }

  return { listIds, getList, createList, add, toggle, remove, clear, cleanup }
}, {
  // 永続化（必要なら）
  persist: true
})
