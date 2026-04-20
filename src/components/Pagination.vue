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
import { computed } from 'vue'

const props = defineProps<{
  page: number
  total: number
  itemsPerPage: number
}>()

const emit = defineEmits<{ 'update:page': [page: number] }>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.itemsPerPage)))
</script>

<template>
  <div class="flex flex-col items-center justify-between gap-3 sm:flex-row">
    <ShadPagination
      :page="page"
      :total="total"
      :items-per-page="itemsPerPage"
      :sibling-count="1"
      class="w-auto mx-0 justify-start"
      @update:page="(page) => emit('update:page', page)"
    >
      <PaginationContent v-slot="{ items }" class="gap-1">
        <PaginationPrevious class="size-9 rounded-full cursor-pointer" />
        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            as-child
            class="cursor-pointer"
          >
            <Button
              class="size-9 rounded-full p-0 text-sm"
              :variant="item.value === page ? 'brand' : 'ghost'"
            >
              {{ item.value }}
            </Button>
          </PaginationItem>
          <PaginationEllipsis v-else :index="index" />
        </template>
        <PaginationNext class="size-9 rounded-full cursor-pointer" />
      </PaginationContent>
    </ShadPagination>

    <p class="text-xs text-muted-foreground">
      Página <span class="font-medium text-foreground">{{ page }}</span> de
      <span class="font-medium text-foreground">{{ totalPages }}</span>
    </p>
  </div>
</template>
