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
import { defineProps, defineEmits } from 'vue';
import type { Todo } from './../composables/useTodos.ts';

defineProps<{ todos: Todo[] }>();

defineEmits<{
  (e: 'toggle', id: number): void;
  (e: 'remove', id: number): void;
}>();
</script>
