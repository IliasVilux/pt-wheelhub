<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{ onNavigate?: () => void }>()
const route = useRoute()

const sidebarItems = useRouter()
  .getRoutes()
  .filter((r) => r.meta?.sidebar)
</script>

<template>
  <aside class="flex h-full w-full flex-col px-3 py-4">
    <img src="/wheelhub_logo.png" alt="WheelHub Logo" class="w-full max-w-40 h-auto" />
    <nav class="flex flex-col gap-1 mt-6">
      <RouterLink
        v-for="routeItem in sidebarItems"
        :key="String(routeItem.name)"
        :to="routeItem.path"
        class="rounded-xl px-5 py-4 text-sm transition-colors"
        :class="
          route.name === routeItem.name
            ? 'bg-white'
            : 'hover:bg-linear-to-r from-sidebar-accent to-zinc-100'
        "
        @click="props.onNavigate?.()"
      >
        <component :is="routeItem.meta.icon" class="inline-block mr-2 size-5" />
        {{ routeItem.meta.label }}
      </RouterLink>
    </nav>
  </aside>
</template>
