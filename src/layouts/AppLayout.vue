<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import { Sheet, SheetContent } from '@/components/ui/sheet'

const mobileOpen = ref(false)
</script>

<template>
  <div
    class="relative flex h-screen overflow-hidden bg-radial-[at_top_left] from-brand-primary/20 via-background to-transparent to-70%"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -top-40 -right-40 size-128 rounded-full bg-brand-secondary/10 blur-3xl"
    />

    <aside class="relative z-10 hidden md:flex w-64 shrink-0">
      <Sidebar />
    </aside>

    <Sheet v-model:open="mobileOpen">
      <SheetContent side="left" class="w-64 p-0">
        <Sidebar :on-navigate="() => (mobileOpen = false)" />
      </SheetContent>
    </Sheet>

    <div class="relative z-10 flex flex-1 flex-col overflow-hidden p-3 md:p-4 md:pl-0">
      <div
        class="flex flex-1 flex-col overflow-hidden rounded-3xl border border-border/50 bg-background/90 shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_60px_-30px_rgba(0,0,0,0.12)] backdrop-blur"
      >
        <Header @menu-click="mobileOpen = true" />
        <main class="flex-1 overflow-y-auto px-6 pb-10 md:px-10">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>
