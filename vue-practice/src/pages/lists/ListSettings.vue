<template>
  <div>
    <h3>Settings for List #{{ listId }}</h3>
    <button @click="clear(listId)">Clear all todos</button>
  </div>
</template>

<script setup lang="ts">
import { useMultiTodoStore } from '@/stores/multiTodo'
const { clear } = useMultiTodoStore()
defineProps<{ listId: number }>()
</script>
