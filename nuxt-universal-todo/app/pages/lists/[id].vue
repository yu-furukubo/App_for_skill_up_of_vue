<script setup lang="ts">
const route = useRoute()
const id = computed(() => Number(route.params.id))

const { data: list, refresh } = await useAsyncData(
  () => `list-${id.value}`,
  () => $fetch(`/api/lists/${id.value}`),
  { watch: [id] } // /lists/1 → /lists/2 にも追随
)
</script>

<template>
  <section class="p-6">
    <h2 class="text-lg mb-2">List {{ list?.name ?? id }}</h2>

    <nav class="mb-4 flex gap-3">
      <NuxtLink :to="`/lists/${id}`">Todos</NuxtLink>
      <NuxtLink :to="`/lists/${id}/settings`">Settings</NuxtLink>
    </nav>

    <!-- 子ページの表示先（Nuxt3は NuxtPage が RouterView 相当） -->
    <NuxtPage :key="$route.fullPath" />
  </section>
</template>
