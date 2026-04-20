<script setup lang="ts">
import { useUser } from '@/composables/useUser'
import { ArrowLeft, Pencil, Mail, Calendar, Shield, Hash } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const userId = Number(route.params.id)
const router = useRouter()

const { user, isLoading, error } = useUser(userId)

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase()
}
</script>

<template>
  <section class="py-8">
    <button
      type="button"
      class="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
      @click="router.go(-1)"
    >
      <ArrowLeft class="size-3.5" />
      Volver
    </button>

    <div
      v-if="isLoading"
      class="mt-8 rounded-2xl border border-border/50 bg-background py-16 text-center text-sm text-muted-foreground"
    >
      <div
        class="mx-auto mb-3 size-8 animate-spin rounded-full border-2 border-muted border-t-brand-primary"
      />
      Cargando usuario…
    </div>
    <div
      v-else-if="error"
      class="mt-8 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive"
    >
      {{ error }}
    </div>

    <template v-else-if="user">
      <div class="mt-4 flex flex-col gap-2">
        <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-4">
            <div
              class="grid size-16 shrink-0 place-items-center rounded-2xl bg-brand-primary/30 text-lg font-semibold text-foreground"
            >
              {{ initials(user.name) }}
            </div>
            <div class="flex flex-col">
              <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">
                {{ user.name }}
              </h1>
              <p class="text-sm text-muted-foreground">{{ user.email }}</p>
            </div>
          </div>

          <RouterLink
            :to="`/users/${userId}/edit`"
            class="inline-flex h-11 items-center justify-center gap-2 self-start rounded-full border border-border/70 bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted/60 sm:self-center"
          >
            <Pencil class="size-4" />
            Editar
          </RouterLink>
        </div>
      </div>

      <div class="mt-8 grid gap-4 sm:grid-cols-2">
        <div class="flex items-start gap-3 rounded-2xl border border-border/50 bg-background p-5">
          <div class="grid size-9 place-items-center rounded-full bg-muted text-muted-foreground">
            <Hash class="size-4" />
          </div>
          <div class="flex flex-col">
            <span class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Identificador
            </span>
            <span class="mt-1 text-sm font-medium">#{{ user.id }}</span>
          </div>
        </div>

        <div class="flex items-start gap-3 rounded-2xl border border-border/50 bg-background p-5">
          <div class="grid size-9 place-items-center rounded-full bg-muted text-muted-foreground">
            <Mail class="size-4" />
          </div>
          <div class="flex flex-col">
            <span class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Email
            </span>
            <span class="mt-1 text-sm font-medium">{{ user.email }}</span>
          </div>
        </div>

        <div class="flex items-start gap-3 rounded-2xl border border-border/50 bg-background p-5">
          <div class="grid size-9 place-items-center rounded-full bg-muted text-muted-foreground">
            <Shield class="size-4" />
          </div>
          <div class="flex flex-col">
            <span class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Rol
            </span>
            <span
              class="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
              :class="
                user.role === 'admin'
                  ? 'bg-brand-secondary/12 text-brand-secondary'
                  : 'bg-success/15 text-success'
              "
            >
              <span
                class="size-1.5 rounded-full"
                :class="user.role === 'admin' ? 'bg-brand-secondary' : 'bg-success'"
              />
              {{ user.role === 'admin' ? 'Admin' : 'Usuario' }}
            </span>
          </div>
        </div>

        <div class="flex items-start gap-3 rounded-2xl border border-border/50 bg-background p-5">
          <div class="grid size-9 place-items-center rounded-full bg-muted text-muted-foreground">
            <Calendar class="size-4" />
          </div>
          <div class="flex flex-col">
            <span class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Fecha de nacimiento
            </span>
            <span class="mt-1 text-sm font-medium">{{ user.birthDate ?? '—' }}</span>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>
