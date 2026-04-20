import type { UserRole } from '@/types/user'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useQueryFilters() {
  const route = useRoute()
  const router = useRouter()

  const name = computed(() => (route.query.name as string) || '')
  const email = computed(() => (route.query.email as string) || '')
  const role = computed(() => (route.query.role as UserRole) || '')
  const page = computed(() => Number(route.query.page) || 1)
  const sortBy = computed(() => (route.query._sort as 'id' | 'name' | 'email' | 'role') || 'id')
  const sortOrder = computed(() => (route.query._order as 'asc' | 'desc') || 'asc')

  function setFilter(key: 'name' | 'email' | 'role', value: string) {
    router.push({ query: { ...route.query, [key]: value || undefined, page: undefined } })
  }

  function setPage(newPage: number) {
    router.push({ query: { ...route.query, page: newPage } })
  }

  function setSort(newSortBy: 'id' | 'name' | 'email' | 'role', newSortOrder: 'asc' | 'desc') {
    router.push({ query: { ...route.query, _sort: newSortBy, _order: newSortOrder } })
  }

  return { name, email, role, page, sortBy, sortOrder, setFilter, setPage, setSort }
}
