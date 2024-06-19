<template>
  <div class="flex items-center gap-x-5 md:gap-x-4">
    <button type="button" class="flex items-center gap-x-2">
      <IconSearch :size="20" stroke-width="1.5" />
      <p class="hidden md:block">Search</p>
    </button>
    <IconSeparator orientation="vertical" class="hidden !h-5 lg:block" />
    <NuxtLink to="/" class="group">
      <IconCircleUserRound
        stroke-width="1.5"
        class="h-5 w-5 transition-colors group-hover:text-custom-primary xl:h-6 xl:w-6"
      />
    </NuxtLink>
    <MenuButton @toggle-menu="emit('toggleMenu')" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['toggleMenu'])
</script>
