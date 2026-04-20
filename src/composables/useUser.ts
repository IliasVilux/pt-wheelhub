import { getUserById } from '@/services/users.api'
import type { User } from '@/types/user'
import { ref, watchEffect } from 'vue'

export function useUser(userId: number) {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  watchEffect(async () => {
    if (!userId) {
      user.value = null
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const result = await getUserById(userId)
      user.value = result
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error desconocido'
    } finally {
      isLoading.value = false
    }
  })

  return { user, isLoading, error }
}
