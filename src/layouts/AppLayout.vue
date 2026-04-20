<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import { Sheet, SheetContent } from '@/components/ui/sheet'

const mobileOpen = ref(false)
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-radial-[at_top_left] from-brand-primary/25 to-transparent to-75%">
    <div class="hidden md:flex w-64">
      <Sidebar />
    </div>

    <Sheet v-model:open="mobileOpen">
      <SheetContent side="left" class="w-60">
        <Sidebar :on-navigate="() => (mobileOpen = false)" />
      </SheetContent>
    </Sheet>

    <div class="flex flex-1 flex-col overflow-hidden">
      <Header @menu-click="mobileOpen = true" />
      <main class="flex-1 overflow-y-auto p-9 bg-background rounded-tl-2xl">
        <RouterView />
      </main>
    </div>
  </div>
</template>
