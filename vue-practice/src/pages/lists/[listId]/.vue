<template>
  <div>
    <h2>{{ store.lists[listId]?.name }}</h2>
    <nav class="mb-2">
      <RouterLink :to="`/lists/${listId}`">Todos</RouterLink> |
      <RouterLink :to="`/lists/${listId}/settings`">Settings</RouterLink>
    </nav>
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMultiTodoStore } from '@/stores/multiTodo'

const route = useRoute()
const store = useMultiTodoStore()
const listId = computed(() => Number(route.params.listId))
</script>
