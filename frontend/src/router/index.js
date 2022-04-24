import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/publication',
    name: 'publication',
    component: () => import('../views/PublicationView.vue')
  },
  {
    path: '/monprofil',
    name: 'monprofil',
    component: () => import('../views/ProfilDetail.vue')
  },
  {
    path: '/monprofil/modification',
    name: 'monprofil-modification',
    component: () => import('../views/ProfilModif.vue')
  },
  {
    path: '/profil/:id',
    name: 'profil-id',
    component: () => import('../views/ProfilOther.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
