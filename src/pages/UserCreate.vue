<script setup lang="ts">
import UserForm from '@/components/UserForm.vue'
import { createUser } from '@/services/users.api'
import type { UpdateUserPayload } from '@/types/user'
import { ArrowLeft } from 'lucide-vue-next'
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
  <section class="py-8">
    <div class="mt-4 flex flex-col gap-1">
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">Crear usuario</h1>
      <p class="mt-1 text-sm text-muted-foreground">
        Rellena el formulario para dar de alta una nueva cuenta.
      </p>
    </div>

    <div class="mt-8 max-w-3xl rounded-2xl border border-border/50 bg-background p-6 md:p-8">
      <UserForm ref="formRef" @submit="handleSubmit" />
    </div>
  </section>
</template>
