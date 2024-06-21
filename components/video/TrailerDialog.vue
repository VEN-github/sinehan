<template>
  <Dialog>
    <DialogTrigger as-child @click="execute"><slot></slot></DialogTrigger>
    <VideoTrailer :is-loading="pending || status === 'pending'" :video="video" />
  </Dialog>
</template>

<script setup lang="ts">
import type { Video } from '~/types/media'

const props = defineProps<{
  id: number
  mediaType: string
}>()

const {
  data: video,
  execute,
  pending,
  status
} = await useLazyFetch(`/api/video/${props.mediaType}/${props.id}`, {
  immediate: false,
  transform: (data: { results: Video[] }) => {
    return data.results
      .filter(
        (video: Video) =>
          video.site === 'YouTube'
          && video.type === 'Trailer'
          && video.name.includes('Trailer')
          && !video.name.includes('Teaser')
      )
      .reverse()[0]
  },
  pick: ['id', 'name', 'key', 'type', 'site']
})
</script>
