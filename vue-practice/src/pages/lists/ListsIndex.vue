<template>
  <div>
    <h1>Lists</h1>
    <form @submit.prevent="onCreate">
      <input v-model="listName" placeholder="新しいリスト名を入力" />
      <button type="submit">追加</button>
    </form>

  <div>
    <!-- watchで更新されるメッセージ -->
    <transition name="fade">
      <!-- refはテンプレートで自動アンラップされる -->
      <p v-if="lastDeltaMsg" class="delta-msg">{{ lastDeltaMsg }}</p>
    </transition>
  </div>

    <ul>
      <li v-for="id in listIds" :key="id" @click="goList(id)">
        <RouterLink :to="`/lists/${id}`">{{ lists[id]?.name ?? `リスト${id}` }}</RouterLink>
        <a style="padding-left: 1em;">未完了 : {{ remainingMap[id] ?? 0 }} 件</a>
        <button @click.stop="removeList(id)">削除</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMultiTodoStore } from '@/stores/multiTodo'

const router = useRouter()
const store = useMultiTodoStore()
const { listIds, lists, remainingMap, lastDeltaMsg } = storeToRefs(store) 
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