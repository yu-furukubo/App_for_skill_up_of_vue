<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

// /a/b/c → ['a','b','c'] になることがある（単一要素なら string のことも）
const raw = route.params.path as string | string[]
const segments = computed(() => Array.isArray(raw) ? raw : [raw])

const goHome = () => router.push('/')
</script>

<template>
  <main style="padding:24px">
    <h1>404 Not Found</h1>
    <p>対象のページは見つかりませんでした。</p>

    <p>
      Path:
      <code>
        /{{ segments.join('/') }}
      </code>
    </p>

    <button @click="goHome">Homeへ戻る</button>
  </main>
</template>