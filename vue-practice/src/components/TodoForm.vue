<template>
  <form @submit.prevent="submitTodo">
    <input v-model="title" placeholder="やることを入力" />
    <button type="submit">追加</button>
  </form>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const title = ref('')

// 親にイベント通知（emit）
const emit = defineEmits<{ (e: 'submit', title: string): void }>()

function submitTodo() {
  emit('submit', title.value)
  title.value = '' // 入力欄をクリア
}
</script>