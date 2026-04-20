<script setup lang="ts">
import UserForm from '@/components/UserForm.vue'
import { createUser } from '@/services/users.api'
import type { UpdateUserPayload } from '@/types/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const formRef = ref<InstanceType<typeof UserForm> | null>(null)

async function handleSubmit(values: UpdateUserPayload) {
  try {
    await createUser(values as Parameters<typeof createUser>[0])
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
    <h1 class="text-2xl md:text-4xl font-medium">Nuevo usuario</h1>
    <UserForm ref="formRef" @submit="handleSubmit" />
  </div>
</template>
