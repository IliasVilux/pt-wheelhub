import UserCreate from '@/pages/UserCreate.vue'
import UserDetail from '@/pages/UserDetail.vue'
import UserEdit from '@/pages/UserEdit.vue'
import UsersList from '@/pages/UsersList.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { Users } from 'lucide-vue-next'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/users',
    },
    {
      path: '/users',
      name: 'users-list',
      component: UsersList,
      meta: { section: 'Usuarios', sidebar: true, label: 'Usuarios', icon: Users },
    },
    {
      path: '/users/create',
      name: 'user-create',
      component: UserCreate,
      meta: { section: 'Nuevo usuario' },
    },
    {
      path: '/users/:id',
      name: 'user-detail',
      component: UserDetail,
      meta: { section: 'Detalle de usuario' },
    },
    {
      path: '/users/:id/edit',
      name: 'user-edit',
      component: UserEdit,
      meta: { section: 'Editar usuario' },
    },
  ],
})

export default router
