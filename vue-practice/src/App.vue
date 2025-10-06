<template>
  <h1>My Todos</h1>
  <!-- フォームで新規Todoを追加 -->
  <TodoForm @submit="addTodo" />

  <!-- 一覧を表示 -->
  <TodoList :todos="todos" @toggle="toggleTodo" @remove="removeTodo" />
</template>

<script setup lang="ts">
import { ref,computed } from 'vue'
import TodoList from './components/TodoList.vue'
import TodoForm from './components/TodoForm.vue'

export type Todo = { id: number; title: string; done: boolean }

const todos = ref<Todo[]>([])

let nextId = computed<number>(()=>
  todos.value.length+1
)

function addTodo(title: string) {
  if (!title.trim()) return
  todos.value.push({ id: nextId.value, title: title.trim(), done: false })
}

function toggleTodo(id: number) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.done = !todo.done
}

function removeTodo(id: number) {
  todos.value = todos.value.filter(t => t.id !== id)
}
</script>