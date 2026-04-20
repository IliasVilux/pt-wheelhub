<script setup lang="ts">
import Pagination from '@/components/Pagination.vue'
import UserFilters from '@/components/UserFilters.vue'
import UserTable from '@/components/UserTable.vue'
import { useQueryFilters } from '@/composables/useQueryFilters'
import { useUsers } from '@/composables/useUsers'
import { Plus } from 'lucide-vue-next'

const PAGE_SIZE = 8
const { name, email, role, page, sortBy, sortOrder, setFilter, setPage, setSort } =
  useQueryFilters()

const { users, total, isLoading, error } = useUsers(() => ({
  page: page.value,
  limit: PAGE_SIZE,
  name: name.value,
  email: email.value,
  role: role.value,
  sortBy: sortBy.value,
  sortOrder: sortOrder.value,
}))
</script>

<template>
  <section class="py-8">
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div class="flex flex-col gap-1">
        <p class="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
          Gestión
        </p>
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">Usuarios</h1>
          <span
            class="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-muted px-2 text-xs font-medium text-muted-foreground"
          >
            {{ total }}
          </span>
        </div>
        <p class="mt-1 text-sm text-muted-foreground">
          Busca, filtra y administra las cuentas registradas.
        </p>
      </div>

      <RouterLink
        to="/users/create"
        class="inline-flex h-11 items-center justify-center gap-2 self-start rounded-full bg-brand-primary px-5 text-sm font-medium text-foreground shadow-[0_1px_0_rgba(0,0,0,0.04),0_10px_24px_-12px_rgba(84,180,30,0.6)] transition-[filter,transform] hover:brightness-[0.97] active:scale-[0.99] sm:self-end"
      >
        <Plus class="size-4" />
        Nuevo usuario
      </RouterLink>
    </div>

    <UserFilters
      :name="name"
      :email="email"
      :role="role"
      class="mb-6"
      @update:name="setFilter('name', $event)"
      @update:email="setFilter('email', $event)"
      @update:role="setFilter('role', $event)"
    />

    <div
      v-if="isLoading"
      class="rounded-2xl border border-border/50 bg-background py-16 text-center text-sm text-muted-foreground"
    >
      <div
        class="mx-auto mb-3 size-8 animate-spin rounded-full border-2 border-muted border-t-brand-primary"
      />
      Cargando usuarios…
    </div>
    <div
      v-else-if="error"
      class="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive"
    >
      {{ error }}
    </div>
    <template v-else>
      <UserTable :users="users" :sort-by="sortBy" :sort-order="sortOrder" @sort="setSort" />
      <Pagination
        class="mt-6"
        :page="page"
        :total="total"
        :items-per-page="PAGE_SIZE"
        @update:page="setPage"
      />
    </template>
  </section>
</template>
