<script setup lang="ts">
import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'

defineProps<{
  page: number
  total: number
  itemsPerPage: number
}>()

const emit = defineEmits<{ 'update:page': [page: number] }>()
</script>

<template>
  <ShadPagination
    :page="page"
    :total="total"
    :items-per-page="itemsPerPage"
    :sibling-count="1"
    @update:page="(page) => emit('update:page', page)"
  >
    <PaginationContent v-slot="{ items }">
      <PaginationPrevious class="cursor-pointer" />
      <template v-for="(item, index) in items" :key="index">
        <PaginationItem v-if="item.type === 'page'" :value="item.value" as-child class="cursor-pointer">
          <Button class="w-9 h-9 p-0" :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationItem>
        <PaginationEllipsis v-else :index="index" />
      </template>
      <PaginationNext class="cursor-pointer" />
    </PaginationContent>
  </ShadPagination>
</template>
