import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cursa',
    name: 'Cursa',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cursa.vue')
  },
  {
    path: '/classificacio',
    name: 'Classificacio',
    component: () => import(/* webpackChunkName: "about" */ '../views/Classificacio.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
