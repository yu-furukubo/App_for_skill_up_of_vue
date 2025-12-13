<template>
  <div>
    <TodoForm text="以下のフォームにTodoを入力してください" @submit="(t) => store.add(listId, t)" />
    <TodoList
      :todos="store.lists[listId]?.todos ?? []"
      @toggle="(id) => store.toggle(listId, id)"
      @remove="(id) => store.remove(listId, id)"
    />
  </div>
</template>

<script setup lang="ts">
import { useMultiTodoStore } from '@/stores/multiTodo';
import TodoForm from '@/components/TodoForm.vue';
import TodoList from '@/components/TodoList.vue';

const { listId } = defineProps<{ listId: number }>();
const store = useMultiTodoStore();
</script>
