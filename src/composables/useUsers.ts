import { getUsers } from '@/services/users.api'
import type { UsersParams } from '@/types/user'
import { ref, watchEffect } from 'vue'

export function useUsers(params: () => UsersParams = () => ({})) {
  const users = ref<Awaited<ReturnType<typeof getUsers>>['users']>([])
  const total = ref(0)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  watchEffect(async () => {
    isLoading.value = true
    error.value = null

    try {
      const result = await getUsers(params())
      users.value = result.users
      total.value = result.total
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error desconocido'
    } finally {
      isLoading.value = false
    }
  })

  return { users, total, isLoading, error }
}
