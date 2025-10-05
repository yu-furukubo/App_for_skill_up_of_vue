<template>
  <h1>My Todos</h1>
  <!-- フォームで新規Todoを追加 -->
  <TodoForm @submit="addTodo" />

  <!-- 一覧を表示 -->
  <TodoList :todos="todos" @toggle="toggleTodo" @remove="removeTodo" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TodoList from './components/TodoList.vue'
import TodoForm from './components/TodoForm.vue'

type Todo = { id: number; title: string; done: boolean }

const todos = ref<Todo[]>([
  { id: 1, title: 'VueのPropsを学ぶ', done: true },
  { id: 2, title: 'Emitの使い方を理解する', done: false },
])

let nextId = 3

function addTodo(title: string) {
  if (!title.trim()) return
  todos.value.push({ id: nextId++, title: title.trim(), done: false })
  console.log(todos.value[todos.value.length - 1].title)
}

function toggleTodo(id: number) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.done = !todo.done
}

function removeTodo(id: number) {
  todos.value = todos.value.filter(t => t.id !== id)
}
</script>