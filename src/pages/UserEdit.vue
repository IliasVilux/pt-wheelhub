<script setup lang="ts">
import UserForm from '@/components/UserForm.vue'
import { useUser } from '@/composables/useUser'
import { updateUser } from '@/services/users.api'
import type { UpdateUserPayload } from '@/types/user'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const userId = Number(route.params.id)

const { user, isLoading, error: fetchError } = useUser(userId)
const formRef = ref<InstanceType<typeof UserForm> | null>(null)

async function handleSubmit(values: UpdateUserPayload) {
  try {
    await updateUser(userId, values)
    router.push({ name: 'users-list' })
  } catch (e: unknown) {
    if (e instanceof Error && 'field' in e) {
      formRef.value?.setFieldError(
        e.field as 'name' | 'email' | 'password' | 'birthDate' | 'role',
        e.message,
      )
    }
  }
}
</script>

<template>
  <div class="max-w-lg flex flex-col gap-6">
    <h1 class="text-2xl md:text-4xl font-medium">Editar usuario</h1>
    <div v-if="isLoading" class="text-muted-foreground text-sm">Cargando...</div>
    <div v-else-if="fetchError" class="text-danger text-sm">{{ fetchError }}</div>
    <template v-else-if="user">
      <UserForm ref="formRef" :user="user" @submit="handleSubmit" />
    </template>
  </div>
</template>
