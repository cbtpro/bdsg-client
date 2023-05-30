import { createRouter, createWebHistory } from 'vue-router'
import { useRouterTabsStore } from '@/stores/router-tabs'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首页',
      },
    },
    {
      path: '/task/generating',
      name: 'task-generating',
      component: () => import('@/views/GeneratingView.vue'),
      meta: {
        title: '生成数据',
      },
    },
    {
      path: '/task/template',
      name: 'task-template',
      component: () => import('@/views/GenerationTemplateView.vue'),
      meta: {
        title: '模板',
      },
    },
    {
      path: '/settings/system',
      name: 'settings-system',
      component: () => import('@/views/SettingsSystemView.vue'),
      meta: {
        title: '系统设置',
      },
    },
    {
      path: '/settings/db-config',
      name: 'settings-db-config',
      component: () => import('@/views/SettingsDbConfigView.vue'),
      meta: {
        title: '数据源设置',
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
      meta: {
        title: '关于',
      },
    }
  ]
})

router.beforeEach((to, from) => {
  const { name, path, meta: { title }} = to

  const routerTabsStore = useRouterTabsStore()

  routerTabsStore.add({
    name: (name || title) as unknown as string,
    path,
    title: title as unknown as string 
  })
})

export default router
