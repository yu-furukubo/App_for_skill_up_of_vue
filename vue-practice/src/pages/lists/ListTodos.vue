<template>
  <div>
    <TodoForm @submit="title => add(listId, title)" />
    <TodoList :todos="todos" @toggle="id => toggle(listId, id)" @remove="id => remove(listId, id)" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMultiTodoStore } from '@/stores/multiTodo'
import TodoForm from '@/components/TodoForm.vue'
import TodoList from '@/components/TodoList.vue'

const props = defineProps<{ listId: number }>()
const store = useMultiTodoStore()

const todos = computed(() => store.getList(props.listId))  // ← listIdごとの配列
const { add, toggle, remove } = store
</script>
