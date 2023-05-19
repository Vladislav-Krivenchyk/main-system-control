import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = []

  routes = [
    {
      path: '/',
      name: 'LandingLayout',
      component: () => import('/src/layouts/LandingLayout.vue')
    },
    {
      path: '/main',
      name: 'MainLayout',
      component: () => import('/src/layouts/MainLayout.vue')
    },
]




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
