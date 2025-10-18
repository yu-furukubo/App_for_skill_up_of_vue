<script setup lang="ts">
import type { List } from '~~/types/todo'

const route = useRoute()
const id = computed(() => Number(route.params.id))

const { data: list, refresh } = await useAsyncData(
  () => `list-${id.value}`,
  () => $fetch<List | null>(`/api/lists/${id.value}`),
  { watch: [id] }
)

const title = ref('')
const add = async () => {
  if (!title.value.trim()) return
  await $fetch(`/api/lists/${id.value}/todos`, { method: 'POST', body: { title: title.value } })
  title.value = ''
  await refresh()
}

const cleanup = async () => {
  await $fetch<void>(`/api/lists/${id.value}/cleanup`, { method: 'POST' })
  await refresh()
}
</script>

<template>
  <div v-if="list">
    <form @submit.prevent="add" class="mb-3 flex gap-2">
      <input v-model="title" placeholder="New todo" class="border px-2 py-1" />
      <button class="border px-3 py-1">Add</button>
    </form>

    <ul class="mb-3">
      <li v-for="t in list.todos" :key="t.id">
        <input type="checkbox" v-model="t.done" @change="refresh()" />
        {{ t.title }}
      </li>
    </ul>

    <button type="button" class="border px-3 py-1" @click="cleanup">Remove done</button>
    <NuxtLink to="/" class="text-blue-600 underline">🏠 Home</NuxtLink>
  </div>
  <p v-else>Loading...</p>
</template>
