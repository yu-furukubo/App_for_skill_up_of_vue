import { createRouter, createWebHistory } from 'vue-router'
import TodoPage from '@/pages/TodoPage.vue'
import AboutPage from '@/pages/AboutPage.vue'

const routes = [
  { path: '/', name: 'home', component: TodoPage },
  { path: '/about', name: 'about', component: AboutPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router