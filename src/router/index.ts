import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

/** 是否是hash路由模式 */
export const isHashRouter = process.env.VUE_APP_ROUTER_MODE === 'hash'

/** 部署目录 */
const BASE = process.env.VUE_APP_ROUTER_BASE

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/home/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
  },
]

const router = createRouter({
  history: isHashRouter ? createWebHashHistory() : createWebHistory(BASE),
  routes,
})

export default router
