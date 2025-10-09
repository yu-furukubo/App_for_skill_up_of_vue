<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <label>
        <input type="checkbox" :checked="todo.done" @change="$emit('toggle', todo.id)" />
        <span :style="todo.done ? { textDecoration: 'line-through', opacity: 0.6 } : {}">
          {{ todo.title }}
        </span>
      </label>
      <button @click="$emit('remove', todo.id)">削除</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, onUnmounted } from 'vue';
import { useTodoStore } from '@/stores/todo';
import type { Todo } from '@/stores/todo'

defineProps<{ todos: Todo[] }>();

defineEmits<{
  (e: 'toggle', id: number): void;
  (e: 'remove', id: number): void;
}>();

const store = useTodoStore()

onUnmounted(()=>{
  console.log('TodoList destroyed → cleaning up done todos...')
  store.cleanup()
})
</script>
