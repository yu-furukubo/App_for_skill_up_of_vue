<template>
  <h1>My Todos</h1>
  <!-- フォームで新規Todoを追加 -->
  <TodoForm :text="text" @submit="addTodo" />

  <!-- 一覧を表示 -->
  <TodoList :todos="todos" @toggle="toggleTodo" @remove="removeTodo" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TodoList from './components/TodoList.vue';
import TodoForm from './components/TodoForm.vue';
import { useTodos } from './composables/useTodos';

const { todos, addTodo, toggleTodo, removeTodo } = useTodos([]);

const text = ref<string>('todoを入力してください。');
</script>
