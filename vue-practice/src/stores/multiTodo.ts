import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Todo = { id: number; title: string; done: boolean }
export type TodoList = { name: string; todos: Todo[] }

export const useMultiTodoStore = defineStore('multiTodo', () => {
  const lists = ref<Record<number, TodoList>>({})
  const listIds = ref<number[]>([])

  const getList = (listId: number) => (lists.value[listId] ??= { name: '', todos: [] })

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

  return { lists, listIds, getList, createList, add, toggle, remove, clear, cleanup, removeList }
}, {
  persist: true
})
