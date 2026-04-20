<script setup lang="ts">
import Pagination from '@/components/Pagination.vue'
import UserTable from '@/components/UserTable.vue'
import { useUsers } from '@/composables/useUsers'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const PAGE_SIZE = 8
const currentPage = computed(() => Number(route.query.page) || 1)
const { users, total, isLoading, error } = useUsers(() => ({
  page: currentPage.value,
  limit: PAGE_SIZE,
}))

function goToPage(newPage: number) {
  router.push({ query: { ...route.query, page: newPage } })
}
</script>

<template>
  <div v-if="isLoading">Cargando...</div>

  <div v-else-if="error" class="text-danger">{{ error }}</div>

  <section v-else>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div class="flex items-center gap-2">
        <h1 class="text-2xl md:text-4xl font-medium">Usuarios</h1>
        <p>{{ total }}</p>
      </div>
      <RouterLink to="/users/create" class="bg-brand-primary px-5 py-3 rounded-2xl text-center w-full sm:w-auto"
        >Nuevo Usuario</RouterLink
      >
    </div>

    <UserTable :users="users" />

    <Pagination
      class="mt-4"
      :page="currentPage"
      :total="total"
      :items-per-page="PAGE_SIZE"
      @update:page="goToPage"
    />
  </section>
</template>
