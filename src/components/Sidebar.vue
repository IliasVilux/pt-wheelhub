<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{ onNavigate?: () => void }>()
const route = useRoute()

const sidebarItems = useRouter()
  .getRoutes()
  .filter((r) => r.meta?.sidebar)
</script>

<template>
  <aside class="flex h-full w-full flex-col px-5 py-6">
    <div class="flex items-center gap-2 px-2 mb-8">
      <img src="/wheelhub_logo.png" alt="WheelHub" class="h-7 w-auto" />
    </div>

    <nav class="mt-3 flex flex-col gap-1">
      <RouterLink
        v-for="routeItem in sidebarItems"
        :key="String(routeItem.name)"
        :to="{ name: routeItem.name }"
        class="group relative flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-colors"
        :class="
          route.name === routeItem.name
            ? 'bg-brand-primary/90 text-foreground shadow-[0_4px_14px_-6px_rgba(84,180,30,0.55)]'
            : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
        "
        @click="props.onNavigate?.()"
      >
        <component :is="routeItem.meta.icon" class="size-[1.05rem] shrink-0" />
        <span>{{ routeItem.meta.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>
