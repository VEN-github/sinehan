<template>
  <AspectRatio :ratio="16 / 9" class="relative">
    <iframe
      class="h-screen w-full"
      :src="`${vidSrcUrl}/${mediaType}/${id}`"
      frameborder="0"
      loading="lazy"
      width="100%"
      height="100%"
      allow="autoplay"
      allowfullscreen
    ></iframe>
    <Button
      variant="outline"
      size="icon"
      class="absolute right-4 top-4 z-10 rounded-full bg-transparent"
      @click="emit('onClose')"
    >
      <IconX />
    </Button>
  </AspectRatio>
</template>

<script setup lang="ts">
defineProps<{
  id: number
  mediaType: string
}>()

const emit = defineEmits(['onClose'])

const runtimeConfig = useRuntimeConfig()

const vidSrcUrl = runtimeConfig.public.vidSrcUrl
</script>
