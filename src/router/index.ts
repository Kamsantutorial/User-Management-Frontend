import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/base/auth/login/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import NotFoundView from '@/views/base/layouts/NotFoundView.vue'
import { fetchRoutes, isAuthorized } from '@/components/base/stores/BaseAuthStore'
import type { Menu } from '@/components/base/models/BaseModel'


const routes = mapToVueRoutes(await fetchRoutes());

console.log("routes ", routes)

// Route Configuration
routes.push([
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '',
    redirect: '/dashboard'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: NotFoundView
  }
])

// Create the router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

function mapToVueRoutes(routes: Menu[]): any {
  return routes.map((route: Menu) => ({
    path: route.path,
    name: route.name,
    component: route.component
      ? () => import(/* webpackChunkName: "[request]" */ `@/views/${route.component}View.vue`)
      : undefined,
    children: route.children ? mapToVueRoutes(route.children) : undefined
  }))
}

router.addRoute(
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
)

// Route Guards
router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !isAuthorized()) {
    return next('/login')
  }
  next()
})

export default router