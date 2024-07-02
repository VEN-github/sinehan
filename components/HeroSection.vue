<template>
  <div
    class="relative h-screen w-full bg-cover bg-center bg-no-repeat"
    :data-lazy-src="media.backdrop_path.original"
  >
    <div class="absolute bottom-0 left-0 w-full">
      <div
        class="absolute inset-0 w-full bg-gradient-to-t from-custom-bg from-0% to-transparent"
      ></div>
      <BaseContainer class="relative pb-6 pt-4 sm:pb-14">
        <div class="mb-8 flex flex-col gap-y-2 sm:gap-y-4">
          <NuxtLink
            :to="`/${slug}/${media.id}`"
            class="text-2xl font-bold tracking-tight transition-colors hover:text-custom-primary xs:text-3xl sm:text-6xl"
          >
            {{ title }}
          </NuxtLink>
          <p class="flex items-center gap-x-3 text-sm sm:text-base">
            <span>{{ releaseDate }}</span>
            <Separator orientation="vertical" class="!h-4" />
            <span :title="genreNamesString">{{ genres }}</span>
            <span
              v-if="rating"
              class="rounded bg-custom-primary px-2 text-base font-medium sm:text-lg"
            >
              {{ rating }}
            </span>
          </p>
        </div>
        <div
          class="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-end landscape:flex-row landscape:justify-end"
        >
          <Button variant="ghost" class="rounded-full">
            <IconPlusCircle stroke-width="1.5" :size="18" />
            <span class="pl-2 font-medium sm:text-lg"> My List </span>
          </Button>
          <Button class="rounded-full bg-custom-primary hover:bg-custom-primary/90" as-child>
            <NuxtLink :to="`/${slug}/${media.id}?play=1`">
              <IconPlayCircle stroke-width="1.5" :size="20" />
              <span class="pl-2 font-medium sm:text-lg">Watch Now</span>
            </NuxtLink>
          </Button>
        </div>
      </BaseContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie, TV } from '~/types/media'

const props = defineProps({
  media: {
    type: Object as PropType<Movie | TV>,
    required: true
  },
  genres: {
    type: Object,
    required: true
  }
})

const slug = useSlug(props.media)
const title = useTitle(props.media)
const releaseDate = useReleaseDate(props.media)
const { genres, genreNamesString } = useGenres(props.media, props.genres.movie, props.genres.tv)
const rating = useRating(props.media)
</script>
