import { createRouter, createWebHistory  } from 'vue-router'
import type {RouteLocationNormalized} from 'vue-router'
const HomePage     = () => import('@/pages/HomePage.vue')
const AboutPage    = () => import('@/pages/AboutPage.vue')
const ListsIndex   = () => import('@/pages/lists/ListsIndex.vue')
const ListLayout   = () => import('@/pages/lists/ListLayout.vue')
const ListTodos    = () => import('@/pages/lists/ListTodos.vue')
const ListSettings = () => import('@/pages/lists/ListSettings.vue')
const listIdProps = (route: RouteLocationNormalized) => ({
  listId: Number(route.params.listId),
})

const routes = [
  { path: '/', name: 'home', component: HomePage  },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/lists', name: 'lists', component: ListsIndex },
  {
    path: '/lists/:listId(\\d+)',
    name: 'list',
    component: ListLayout,
    props: listIdProps,
    children: [
      { path: '',          name: 'list-todos',    component: ListTodos,    props: listIdProps },
      { path: 'settings',  name: 'list-settings', component: ListSettings, props: listIdProps },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router