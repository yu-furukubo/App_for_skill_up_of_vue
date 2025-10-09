// src/stores/todo.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type Todo = { id: number; title: string; done: boolean }

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])

  // 次IDは既存の最大+1（削除後でも衝突しない）
  const nextId = computed(() =>
    todos.value.length ? Math.max(...todos.value.map(t => t.id)) + 1 : 1
  )

  function add(title: string) {
    const t = title.trim()
    if (!t) return
    todos.value.push({ id: nextId.value, title: t, done: false })
  }

  function toggle(id: number) {
    const item = todos.value.find(t => t.id === id)
    if (item) item.done = !item.done
  }

  function remove(id: number) {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  function cleanup() {
    todos.value = todos.value.filter(t => !t.done)
  }
  
  return { todos, nextId, add, toggle, remove,cleanup}
},{
    persist: true
})
