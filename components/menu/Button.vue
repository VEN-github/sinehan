<template>
  <button
    type="button"
    class="hamburger hamburger--slider lg:hidden"
    :class="{ 'is-active': isOpen }"
    @click="emit('toggleMenu')"
  >
    <span class="hamburger-box">
      <span class="hamburger-inner"></span>
    </span>
  </button>
</template>

<script setup lang="ts">
const isOpen = inject('isOpen') as boolean

const emit = defineEmits(['toggleMenu'])
</script>
