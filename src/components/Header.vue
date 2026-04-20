<script setup lang="ts">
import { Menu } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

defineEmits<{ menuClick: [] }>()
const route = useRoute()
</script>

<template>
  <header class="flex items-center gap-3 border-b border-border/50 px-6 py-5 md:px-10">
    <button
      class="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground md:hidden"
      aria-label="Abrir menú"
      @click="$emit('menuClick')"
    >
      <Menu class="size-5" />
    </button>

    <nav aria-label="breadcrumb" class="text-sm">
      <span class="font-medium text-foreground">{{ route.meta.section }}</span>
    </nav>
  </header>
</template>
