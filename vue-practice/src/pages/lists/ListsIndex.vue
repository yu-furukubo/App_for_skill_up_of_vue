<template>
  <div>
    <h1>Lists</h1>
    <form @submit.prevent="onCreate">
      <input v-model="listName" placeholder="新しいリスト名を入力" />
      <button type="submit">追加</button>
    </form>

    <ul>
      <li v-for="id in store.listIds" :key="id" @click="goList(id)">
        <RouterLink :to="`/lists/${id}`">{{ store.lists[id]?.name ?? `リスト${id}` }}</RouterLink>
        <button @click.stop="removeList(id)">削除</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMultiTodoStore } from '@/stores/multiTodo'

const router = useRouter()
const store = useMultiTodoStore()
const listName = ref('')

function goList(id:number){
  router.push(`/lists/${id}`)
}

function onCreate() {
  store.createList(listName.value)
  listName.value = ''
}

function removeList(id:number){
  store.removeList(id)
}
</script>