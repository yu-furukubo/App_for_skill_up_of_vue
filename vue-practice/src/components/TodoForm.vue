<template>
  <p>{{ text }}</p>
  <form @submit.prevent="submitTodo">
    <input v-model="title" placeholder="Todoを入力" />
    <button type="submit">追加</button>
  </form>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue';

const title = ref('');

defineProps<{ text: string }>();

const emit = defineEmits<{ (e: 'submit', title: string): void }>();

function submitTodo() {
  emit('submit', title.value);
  title.value = ''; // 入力欄をクリア
}
</script>
