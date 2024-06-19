<template>
  <div class="flex items-center gap-x-2 md:gap-x-4">
    <button type="button" class="flex items-center gap-x-2">
      <IconSearch :size="20" stroke-width="1.5" />
      <p class="hidden md:block">Search</p>
    </button>
    <Separator orientation="vertical" class="hidden !h-5 lg:block" />
    <ClientOnly fallback-tag="span" fallback="Loading...">
      <BaseAvatar />
    </ClientOnly>
    <MenuButton @toggle-menu="emit('toggleMenu')" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['toggleMenu'])
</script>
