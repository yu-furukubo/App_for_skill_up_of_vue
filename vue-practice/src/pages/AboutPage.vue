<template>
  <div>
    <h1>About</h1>
    <p>これはTodoアプリの学習用ページです。</p>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'

onUnmounted(() => {
  console.log('✅ Aboutページがアンマウントされました')
})
</script>