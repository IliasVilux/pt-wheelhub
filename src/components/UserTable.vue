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
import { Eye, Pencil } from 'lucide-vue-next'

defineProps<{ users: User[] }>()
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-border/50 bg-background">
    <Table>
      <TableHeader>
        <TableRow class="hover:bg-transparent">
          <TableHead class="w-20">ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Rol</TableHead>
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
