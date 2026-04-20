<script setup lang="ts">
import { useUser } from '@/composables/useUser'
import { ArrowLeft } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const userId = Number(route.params.id)
const router = useRouter()

const { user, isLoading, error } = useUser(userId)
</script>

<template>
  <div v-if="isLoading" class="text-muted-foreground text-sm py-6 text-center">Cargando...</div>
  <div v-else-if="error" class="text-danger text-sm">{{ error }}</div>
  <section v-else-if="user" class="flex flex-col gap-6">
    <div class="flex items-center gap-3">
      <button
        class="bg-brand-primary px-5 py-3 rounded-2xl flex items-center gap-2"
        @click="router.go(-1)"
      >
        <ArrowLeft class="size-5" />
        Volver
      </button>
      <RouterLink
        :to="`/users/${userId}/edit`"
        class="px-5 py-3 rounded-2xl border flex items-center gap-2 text-sm font-medium hover:bg-muted transition-colors"
      >
        Editar
      </RouterLink>
    </div>

    <div class="rounded-2xl border bg-background/60 p-6 flex flex-col gap-4">
      <h2 class="text-2xl font-medium">{{ user.name }}</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div class="flex flex-col gap-1">
          <span class="text-muted-foreground">Identificador</span>
          <span class="font-medium">#{{ user.id }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-muted-foreground">Email</span>
          <span class="font-medium">{{ user.email }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-muted-foreground">Rol</span>
          <span class="font-medium capitalize">{{ user.role }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-muted-foreground">Fecha de nacimiento</span>
          <span class="font-medium">{{ user.birthDate ?? '—' }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
