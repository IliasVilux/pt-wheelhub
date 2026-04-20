<script setup lang="ts">
import UserForm from '@/components/UserForm.vue'
import { useUser } from '@/composables/useUser'
import { updateUser } from '@/services/users.api'
import type { UpdateUserPayload } from '@/types/user'
import { ArrowLeft } from 'lucide-vue-next'
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
  <section class="py-8">
    <div class="mt-4 flex flex-col gap-1">
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">Editar usuario</h1>
      <p class="mt-1 text-sm text-muted-foreground">
        Actualiza los datos de la cuenta seleccionada.
      </p>
    </div>

    <div class="mt-8 max-w-3xl">
      <div
        v-if="isLoading"
        class="rounded-2xl border border-border/50 bg-background py-16 text-center text-sm text-muted-foreground"
      >
        <div class="mx-auto mb-3 size-8 animate-spin rounded-full border-2 border-muted border-t-brand-primary" />
        Cargando datos…
      </div>
      <div
        v-else-if="fetchError"
        class="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive"
      >
        {{ fetchError }}
      </div>
      <div
        v-else-if="user"
        class="rounded-2xl border border-border/50 bg-background p-6 md:p-8"
      >
        <UserForm ref="formRef" :user="user" @submit="handleSubmit" />
      </div>
    </div>
  </section>
</template>
