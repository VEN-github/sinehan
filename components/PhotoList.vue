<template>
  <a
    v-for="photo in formattedPhotos"
    :key="photo.original"
    :class="{ relative: photos.length > 4 && photo === lastPhoto }"
    data-fancybox="gallery"
    :href="photo.original"
  >
    <img
      :src="photo.small"
      :alt="photo.small"
      class="w-28 rounded-lg object-cover object-center drop-shadow-2xl xs:w-36"
    />
    <div
      v-if="photos.length > 4 && photo === lastPhoto"
      class="absolute inset-0 rounded-lg bg-[#222]/75 ring-2 ring-custom-foreground"
    ></div>
    <div
      v-if="photos.length > 4 && photo === lastPhoto"
      class="absolute inset-0 flex items-center justify-center"
    >
      <p v-if="photos.length > 4 && photo === lastPhoto" class="text-2xl text-white">
        +{{ photos.length - 4 }}
      </p>
    </div>
  </a>
  <div v-if="photos.length > 4" class="hidden">
    <a
      v-for="photo in photos.slice(5)"
      :key="photo.original"
      data-fancybox="gallery"
      :href="photo.original"
    >
      <img :src="photo.small" :alt="photo.small" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import type { Photo } from '~/types/media'

const props = defineProps<{
  photos: Photo[]
}>()

const formattedPhotos = computed<Photo[]>(() => {
  return props.photos.slice(0, 4)
})

const lastPhoto = computed<Photo>(() => {
  return formattedPhotos.value[formattedPhotos.value.length - 1]
})

onMounted(() => {
  Fancybox.bind('[data-fancybox="gallery"]', {})
})

onUpdated(() => {
  Fancybox.unbind('[data-fancybox="gallery"]')
  Fancybox.close()

  Fancybox.bind('[data-fancybox="gallery"]', {})
})

onUnmounted(() => {
  Fancybox.destroy()
})
</script>
