<template>
  <div class="flex h-full w-fit flex-col">
    <NuxtLink :to="`/`" class="group grow">
      <img
        class="h-full grow rounded-lg object-cover object-center drop-shadow-2xl transition-opacity group-hover:opacity-70"
        :src="media.poster_path"
        :alt="title"
        :width="imgWidth"
      />
    </NuxtLink>
    <div class="mt-2 flex items-center justify-between gap-x-1">
      <NuxtLink
        :to="`/`"
        class="w-36 truncate text-lg transition-colors hover:text-custom-primary"
        :title="title"
      >
        {{ title }}
      </NuxtLink>
      <p v-if="rating" class="rounded bg-custom-primary px-1.5 text-sm font-medium">
        {{ rating }}
      </p>
    </div>
    <p class="text-custom-foreground-secondary text-sm">{{ releaseDate }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Movie, TV } from '~/types/media'

const props = defineProps({
  media: {
    type: Object as PropType<Movie | TV>,
    required: true
  },
  imgWidth: {
    type: [String, Number],
    default() {
      return 200
    }
  }
})

// const slug = useSlug(props.media)
const title = useTitle(props.media)
const releaseDate = useReleaseDate(props.media)
const rating = useRating(props.media)
</script>
