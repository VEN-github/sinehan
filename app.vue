<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (title) => {
    return title ? `${title} | Sinehan` : 'Sinehan'
  }
})
</script>
