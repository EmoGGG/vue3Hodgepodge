import { createRouter, createWebHistory } from 'vue-router'
export const mainChildren = [
  {
    path: '/virSroller',
    name: 'virSroller',
    component: () => import('@/views/virtualSroller/TestV.vue')
  },
  {
    path: 'oaTree',
    name: 'oaTree',
    component: () => import('@/views/oaTree/TestV.vue')
  },
  {
    path: 'normalTree',
    name: 'normalTree',
    component: () => import('@/views/normalTree/TestV.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: () => import('@/views/mainPage/MainPage.vue'),
      children: mainChildren
    }
  ]
})

export default router
