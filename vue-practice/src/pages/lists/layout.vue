<template>
  <div>
    <h2>{{ store.lists[listId]?.name }}</h2>
    <nav class="mb-2">
      <router-link :to="{ name:'list-todos',    params:{ listId } }">Todos</router-link> |
      <router-link :to="{ name:'list-settings', params:{ listId } }">Settings</router-link>
    </nav>
    <router-view :list-id="listId" />
  </div>
</template>

<script setup lang="ts">
import { useMultiTodoStore } from '@/stores/multiTodo';
const store = useMultiTodoStore()
defineProps<{ listId: number }>()
</script>
