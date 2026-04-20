<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { User } from '@/types/user'
import { Eye, Pencil, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-vue-next'

type SortColumn = 'id' | 'name' | 'email' | 'role'
type SortOrder = 'asc' | 'desc'

const props = defineProps<{
  users: User[]
  sortBy: SortColumn
  sortOrder: SortOrder
}>()

const emit = defineEmits<{
  sort: [sortBy: SortColumn, sortOrder: SortOrder]
}>()

function toggleSort(column: SortColumn) {
  if (props.sortBy !== column) {
    emit('sort', column, 'asc')
  } else if (props.sortOrder === 'asc') {
    emit('sort', column, 'desc')
  } else {
    emit('sort', 'id', 'asc')
  }
}
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-border/50 bg-background">
    <Table>
      <TableHeader>
        <TableRow class="hover:bg-transparent">
          <TableHead class="w-20">ID</TableHead>
          <TableHead
            class="cursor-pointer select-none transition-colors hover:text-foreground"
            :class="sortBy === 'name' ? 'text-foreground' : ''"
            v-on:click="toggleSort('name')"
          >
            <span class="inline-flex items-center gap-1.5">
              Nombre
              <ChevronUp
                v-if="sortBy === 'name' && sortOrder === 'asc'"
                class="size-3.5 text-brand-secondary"
              />
              <ChevronDown
                v-else-if="sortBy === 'name' && sortOrder === 'desc'"
                class="size-3.5 text-brand-secondary"
              />
              <ChevronsUpDown v-else class="size-3.5 text-muted-foreground/40" />
            </span>
          </TableHead>
          <TableHead
            class="cursor-pointer select-none transition-colors hover:text-foreground"
            :class="sortBy === 'email' ? 'text-foreground' : ''"
            v-on:click="toggleSort('email')"
          >
            <span class="inline-flex items-center gap-1.5">
              Email
              <ChevronUp
                v-if="sortBy === 'email' && sortOrder === 'asc'"
                class="size-3.5 text-brand-secondary"
              />
              <ChevronDown
                v-else-if="sortBy === 'email' && sortOrder === 'desc'"
                class="size-3.5 text-brand-secondary"
              />
              <ChevronsUpDown v-else class="size-3.5 text-muted-foreground/40" />
            </span>
          </TableHead>
          <TableHead
            class="cursor-pointer select-none transition-colors hover:text-foreground"
            :class="sortBy === 'role' ? 'text-foreground' : ''"
            v-on:click="toggleSort('role')"
          >
            <span class="inline-flex items-center gap-1.5">
              Rol
              <ChevronUp
                v-if="sortBy === 'role' && sortOrder === 'asc'"
                class="size-3.5 text-brand-secondary"
              />
              <ChevronDown
                v-else-if="sortBy === 'role' && sortOrder === 'desc'"
                class="size-3.5 text-brand-secondary"
              />
              <ChevronsUpDown v-else class="size-3.5 text-muted-foreground/40" />
            </span>
          </TableHead>
          <TableHead class="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="user in users" :key="user.id" class="group">
          <TableCell class="text-xs font-medium text-muted-foreground"> #{{ user.id }} </TableCell>
          <TableCell>
            <div class="flex items-center gap-3">
              <span class="font-medium">{{ user.name }}</span>
            </div>
          </TableCell>
          <TableCell class="text-muted-foreground">{{ user.email }}</TableCell>
          <TableCell>
            <span
              class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
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
          </TableCell>
          <TableCell>
            <div class="flex items-center justify-end gap-1">
              <RouterLink
                :to="`/users/${user.id}`"
                aria-label="Ver detalle"
                class="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
              >
                <Eye class="size-4" />
              </RouterLink>
              <RouterLink
                :to="`/users/${user.id}/edit`"
                aria-label="Editar"
                class="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
              >
                <Pencil class="size-4" />
              </RouterLink>
            </div>
          </TableCell>
        </TableRow>
        <TableRow v-if="users.length === 0" class="hover:bg-transparent">
          <TableCell colspan="5" class="py-14 text-center text-sm text-muted-foreground">
            Ningún usuario coincide con los filtros aplicados.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
