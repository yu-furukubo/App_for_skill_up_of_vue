import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'

export default createRouter({
  history: createWebHistory(),
  routes: generatedRoutes,
  scrollBehavior: () => ({ top: 0 }),
})