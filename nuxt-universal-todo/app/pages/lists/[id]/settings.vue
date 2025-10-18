<script setup lang="ts">
import type { List } from '~~/types/todo'
const route = useRoute()
const id = computed(() => Number(route.params.id))

const { data: list } = await useAsyncData(
  () => `list-${id.value}`,
  () => $fetch<List | null>(`/api/lists/${id.value}`),
  { watch: [id] }
)
</script>

<template>
  <div v-if="list">
    <h3 class="mb-2">Settings</h3>
    <p>（ここに名前変更などを配置）</p>
  </div>
  <p v-else>Loading...</p>
  <NuxtLink to="/" class="text-blue-600 underline">🏠 Home</NuxtLink>
</template>
