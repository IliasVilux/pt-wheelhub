<script setup lang="ts">
import { Menu } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

defineEmits<{ menuClick: [] }>()
const route = useRoute()
</script>

<template>
  <header class="flex items-center px-3 py-6">
    <button class="md:hidden rounded-md cursor-pointer ml-3" @click="$emit('menuClick')">
      <Menu class="size-5" />
    </button>
    <h1 class="text-sm hidden md:block">
      {{ route.meta.section }}
    </h1>
  </header>
</template>
