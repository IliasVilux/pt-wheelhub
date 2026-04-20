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
  <div class="rounded-2xl overflow-hidden">
    <Table>
      <TableHeader class="bg-[#f5f5f5]">
        <TableRow>
          <TableHead>Identificador</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Email</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="user in users" :key="user.id">
          <TableCell class="text-muted-foreground hover:text-brand-primary transition-colors">{{
            user.id
          }}</TableCell>
          <TableCell class="font-medium hover:text-brand-primary transition-colors">{{
            user.name
          }}</TableCell>
          <TableCell class="text-muted-foreground hover:text-brand-primary transition-colors">{{
            user.email
          }}</TableCell>
          <TableCell class="text-right flex gap-4">
            <RouterLink
              :to="`/users/${user.id}`"
              class="text-xs cursor-pointer hover:text-brand-primary transition-colors flex items-center gap-1"
            >
              <Eye class="size-5" />
              Ver
            </RouterLink>
            <RouterLink
              :to="`/users/${user.id}/edit`"
              class="text-xs cursor-pointer hover:text-brand-primary transition-colors flex items-center gap-1"
            >
              <Pencil class="size-5" />
              Editar
            </RouterLink>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
