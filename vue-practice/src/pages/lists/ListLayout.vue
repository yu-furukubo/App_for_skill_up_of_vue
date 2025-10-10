<template>
  <div>
    <h2>List #{{ listId }}</h2>
    <nav class="mb-2">
      <router-link :to="{ name:'list-todos',    params:{ listId } }">Todos</router-link> |
      <router-link :to="{ name:'list-settings', params:{ listId } }">Settings</router-link>
    </nav>
    <router-view :list-id="listId" /> <!-- 子に渡す -->
  </div>
</template>

<script setup lang="ts">
defineProps<{ listId: number }>()
</script>
