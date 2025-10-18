<script setup lang="ts">
import type { List } from '~~/types/todo'

// SSRでリスト取得（失敗しても空配列を返してページが落ちないように）
const { data: lists, refresh } = await useAsyncData<List[]>(
  'lists',
  async () => {
    try {
      return await $fetch('/api/lists')
    } catch {
      return []
    }
  }
)

// Nuxtは ref / navigateTo を自動インポート
const name = ref('')

const createList = async () => {
  const title = name.value.trim()
  if (!title) return
  try {
    const created = await $fetch<List>('/api/lists', {
      method: 'POST',
      body: { name: title }
    })
    name.value = ''
    await refresh()                       // CSR時に再取得
    await navigateTo(`/lists/${created.id}`)
  } catch (e) {
    console.error('createList failed', e)
  }
}
</script>

<template>
  <main class="p-6">
    <h1 class="text-xl mb-3">Lists</h1>

    <form @submit.prevent="createList" class="mb-4 flex gap-2">
      <input v-model="name" placeholder="New list name" class="border px-2 py-1" />
      <button class="border px-3 py-1">Create</button>
    </form>

    <ul>
      <!-- lists は Ref<List[] | null> なので null セーフに -->
      <li v-for="l in (lists ?? [])" :key="l.id">
        <NuxtLink :to="`/lists/${l.id}`">{{ l.name }}</NuxtLink>
      </li>
    </ul>
  </main>
</template>
