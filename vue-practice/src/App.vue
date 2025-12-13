<template>
  <div class="layout">
    <header class="global-header">
      <router-link to="/">Home</router-link> | <router-link to="/lists">Lists</router-link> |
      <router-link to="/about">About</router-link>
    </header>

    <main class="content">
      <RouterView v-slot="{ Component, route }">
        <transition name="fade">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.header {
  flex-shrink: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  flex: 1;
  overflow: auto;
  padding: 16px;
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  position: absolute;
  inset: 0;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.global-header :deep(a) {
  padding: 0 1.5rem;
  text-decoration: none;
  color: #333;
}
.global-header :deep(.router-link-active) {
  font-weight: bold;
  color: #007bff;
}
</style>

<script setup lang="ts">
import { useMultiTodoStore } from '@/stores/multiTodo';
import { initTodoDeltaMessage } from '@/composables/useTodoDeltaMessage';

const store = useMultiTodoStore();
initTodoDeltaMessage(store);
</script>
