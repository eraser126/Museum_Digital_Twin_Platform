import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VisitorView from '../views/VisitorView.vue'
import CommentView from '../views/CommentView.vue'
import DeviceView from '../views/DeviceView.vue'
import MapView from '@/views/MapView.vue'
import LandingView from '@/views/LandingView.vue'
import ProductView from '@/views/ProductView.vue'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/visitor',
    name: 'visitor',
    component: VisitorView
  },
  {
    path: '/comment',
    name: 'comment',
    component: CommentView
  },
  {
    path: '/device',
    name: 'device',
    component: DeviceView
  },
  {
    path: '/map',
    name: 'map',
    component: MapView
  },
  {
    path: '/product',
    name: 'product',
    component: ProductView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
