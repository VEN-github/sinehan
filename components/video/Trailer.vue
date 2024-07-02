<template>
  <DialogContent class="max-w-2xl border-0 bg-custom-bg">
    <DialogHeader>
      <DialogTitle></DialogTitle>
      <DialogDescription></DialogDescription>
    </DialogHeader>
    <div v-if="isLoading" class="grid h-80 place-items-center">
      <IconLoaderCircle class="animate-spin text-custom-primary" :size="64" />
    </div>
    <AspectRatio v-else-if="!isLoading && video" :ratio="16 / 9">
      <iframe
        width="100%"
        height="100%"
        :src="`https://www.youtube.com/embed/${video?.key}?autoplay=1`"
        :title="video?.name"
        frameborder="0"
        loading="lazy"
        allow="autoplay"
        allowfullscreen
      ></iframe>
    </AspectRatio>
    <div v-else class="grid h-80 place-items-center">
      <h1 class="text-3xl font-medium">No trailer found.</h1>
    </div>
  </DialogContent>
</template>

<script setup lang="ts">
import type { Video } from '~/types/media'

interface Props {
  isLoading: boolean
  video: Video | null
}

defineProps<Props>()
</script>
