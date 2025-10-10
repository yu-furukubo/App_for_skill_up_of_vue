import { createRouter, createWebHistory  } from 'vue-router'
const HomePage     = () => import('@/pages/HomePage.vue')
const AboutPage    = () => import('@/pages/AboutPage.vue')
const ListsIndex   = () => import('@/pages/lists/ListsIndex.vue')
const ListLayout   = () => import('@/pages/lists/ListLayout.vue')
const ListTodos    = () => import('@/pages/lists/ListTodos.vue')
const ListSettings = () => import('@/pages/lists/ListSettings.vue')  

const routes = [
  { path: '/', name: 'home', component: HomePage  },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/lists', name: 'lists', component: ListsIndex },
  {
    path: '/lists/:listId(\\d+)',
    name: 'list',
    component: ListLayout,
    props: true,
    children: [
      { path: '',          name: 'list-todos',    component: ListTodos,    props: true },
      { path: 'settings',  name: 'list-settings', component: ListSettings, props: true },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router