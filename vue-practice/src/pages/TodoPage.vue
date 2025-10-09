<template>
  <h1>My Todos</h1>
  <!-- フォームで新規Todoを追加 -->
  <TodoForm :text="text" @submit="add" />

  <!-- 一覧を表示 -->
  <TodoList :todos="todos" @toggle="toggle" @remove="remove" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TodoList from '@/components/TodoList.vue';
import TodoForm from '@/components/TodoForm.vue';
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todo';

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)
const { add, toggle, remove} = todoStore

const text = ref<string>('todoを入力してください。');
</script>
