<template>
  <div>
    <h1>Lists</h1>
    <ul>
      <li v-for="l in listIds" :key="l">
        <router-link :to="{ name:'list-todos', params:{ listId: l } }">
          List #{{ l }}
        </router-link>
      </li>
    </ul>
    <button @click="createList">+ New List</button>
  </div>
</template>

<script setup lang="ts">
import { useMultiTodoStore } from '@/stores/multiTodo'
import { storeToRefs } from 'pinia'

const store = useMultiTodoStore()
const { listIds } = storeToRefs(store)
const { createList } = store
</script>