<script setup lang="ts">
import { useDebounce } from '@/composables/useDebounce'
import type { UserRole } from '@/types/user'
import { ref, watch } from 'vue'

const props = defineProps<{
  name: string
  email: string
  role: UserRole | ''
}>()

const emit = defineEmits<{
  'update:name': [value: string]
  'update:email': [value: string]
  'update:role': [value: UserRole | '']
}>()

const localName = ref(props.name)
const localEmail = ref(props.email)

const debouncedName = useDebounce(() => localName.value, 300)
const debouncedEmail = useDebounce(() => localEmail.value, 300)

watch(debouncedName, (val) => emit('update:name', val))
watch(debouncedEmail, (val) => emit('update:email', val))

watch(
  () => props.name,
  (val) => {
    localName.value = val
  },
)
watch(
  () => props.email,
  (val) => {
    localEmail.value = val
  },
)
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-3">
    <input
      v-model="localName"
      type="text"
      placeholder="Filtrar por nombre..."
      class="flex-1 rounded-xl border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-primary/40"
    />
    <input
      v-model="localEmail"
      type="text"
      placeholder="Filtrar por email..."
      class="flex-1 rounded-xl border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-primary/40"
    />
    <select
      :value="role"
      class="rounded-xl border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-primary/40"
      @change="emit('update:role', ($event.target as HTMLSelectElement).value as UserRole | '')"
    >
      <option value="">Todos los roles</option>
      <option value="admin">Admin</option>
      <option value="user">Usuario</option>
    </select>
  </div>
</template>
