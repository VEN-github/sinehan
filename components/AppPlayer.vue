<template>
  <AspectRatio :ratio="16 / 9" class="relative">
    <iframe
      class="h-screen w-full"
      :src="`https://vidsrc.to/embed/${mediaType}/${id}`"
      frameborder="0"
      loading="lazy"
      width="100%"
      height="100%"
      allow="autoplay"
      allowfullscreen
    ></iframe>
    <Button variant="outline" size="icon" class="absolute bg-transparent rounded-full top-4 right-4 z-10" @click="emit('onClose')"><IconX /></Button>
  </AspectRatio>
</template>

<script setup lang="ts">
defineProps<{
  id: number
  mediaType: string
}>()

const emit = defineEmits(['onClose'])
</script>
