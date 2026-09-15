import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import siteinacabado from '../views/503View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/503',
      name: '503',
      component: siteinacabado,
    },
  ],
})

export default router
