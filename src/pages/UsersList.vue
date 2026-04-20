<script setup lang="ts">
import Pagination from '@/components/Pagination.vue'
import UserFilters from '@/components/UserFilters.vue'
import UserTable from '@/components/UserTable.vue'
import { useQueryFilters } from '@/composables/useQueryFilters'
import { useUsers } from '@/composables/useUsers'

const PAGE_SIZE = 8
const { name, email, role, page, setFilter, setPage } = useQueryFilters()

const { users, total, isLoading, error } = useUsers(() => ({
  page: page.value,
  limit: PAGE_SIZE,
  name: name.value,
  email: email.value,
  role: role.value,
}))
</script>

<template>
  <section>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div class="flex items-center gap-2">
        <h1 class="text-2xl md:text-4xl font-medium">Usuarios</h1>
        <p>{{ total }}</p>
      </div>
      <RouterLink
        to="/users/create"
        class="bg-brand-primary px-5 py-3 rounded-2xl text-center w-full sm:w-auto"
        >Nuevo Usuario</RouterLink
      >
    </div>

    <UserFilters
      :name="name"
      :email="email"
      :role="role"
      class="mb-4"
      @update:name="setFilter('name', $event)"
      @update:email="setFilter('email', $event)"
      @update:role="setFilter('role', $event)"
    />

    <div v-if="isLoading" class="text-muted-foreground text-sm py-6 text-center">Cargando...</div>
    <div v-else-if="error" class="text-danger text-sm">{{ error }}</div>
    <template v-else>
      <UserTable :users="users" />
      <Pagination
        class="mt-4"
        :page="page"
        :total="total"
        :items-per-page="PAGE_SIZE"
        @update:page="setPage"
      />
    </template>
  </section>
</template>
