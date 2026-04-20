<script setup lang="ts">
import { useDebounce } from '@/composables/useDebounce'
import type { UserRole } from '@/types/user'
import { Search, Mail, ChevronDown, X } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

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

const hasActive = computed(() => !!(localName.value || localEmail.value || props.role))

function clearAll() {
  localName.value = ''
  localEmail.value = ''
  emit('update:name', '')
  emit('update:email', '')
  emit('update:role', '')
}
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
    <button
      type="button"
      class="grid size-11 shrink-0 place-items-center rounded-full border border-border/60 bg-background text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
      :disabled="!hasActive"
      aria-label="Limpiar filtros"
      @click="clearAll"
    >
      <X class="size-4" />
    </button>

    <div class="relative flex-1">
      <Search
        class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/70"
      />
      <input
        v-model="localName"
        type="text"
        placeholder="Buscar por nombre"
        class="h-11 w-full rounded-full border border-border/60 bg-background pl-10 pr-4 text-sm outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-brand-primary/60 focus-visible:ring-[3px] focus-visible:ring-brand-primary/25"
      />
    </div>

    <div class="relative flex-1">
      <Mail
        class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/70"
      />
      <input
        v-model="localEmail"
        type="text"
        placeholder="Buscar por email"
        class="h-11 w-full rounded-full border border-border/60 bg-background pl-10 pr-4 text-sm outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-brand-primary/60 focus-visible:ring-[3px] focus-visible:ring-brand-primary/25"
      />
    </div>

    <div class="relative w-full sm:w-52">
      <select
        :value="role"
        class="h-11 w-full appearance-none rounded-full border border-border/60 bg-background pl-5 pr-10 text-sm outline-none transition-[border-color,box-shadow] focus-visible:border-brand-primary/60 focus-visible:ring-[3px] focus-visible:ring-brand-primary/25"
        @change="emit('update:role', ($event.target as HTMLSelectElement).value as UserRole | '')"
      >
        <option value="">Todos los roles</option>
        <option value="admin">Admin</option>
        <option value="user">Usuario</option>
      </select>
      <ChevronDown
        class="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/70"
      />
    </div>
  </div>
</template>
