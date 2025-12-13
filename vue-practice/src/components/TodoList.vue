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
import { onUnmounted } from 'vue';
import { useMultiTodoStore } from '@/stores/multiTodo';
import type { Todo } from '@/stores/multiTodo';

defineProps<{ todos: Todo[] }>();

defineEmits<{
  (e: 'toggle', id: number): void;
  (e: 'remove', id: number): void;
}>();

const multiStore = useMultiTodoStore();

onUnmounted(() => {
  console.log('TodoList destroyed → cleaning up done todos...');
  multiStore.cleanup();
});
</script>
