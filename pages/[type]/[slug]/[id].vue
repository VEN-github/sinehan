<template>
  <section>
    <ClientOnly fallback-tag="div">
      <div
        v-if="showPlayer && !isPlaying"
        class="min-h-screen w-full relative bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${media?.backdrop_path.original})` }"
      >
        <div class="min-h-screen w-full grid place-items-center bg-gradient-to-br from-custom-bg from-0% to-transparent">
          <IconLoaderCircle class="animate-spin text-custom-primary" :size="64" />
        </div>
      </div>
      <AppPlayer v-else-if="isPlaying && showPlayer && media" :id="media?.id" :media-type="mediaType" @on-close="handleShowPlayer" />
      <template v-else>
        <div
          class="min-h-screen w-full bg-cover bg-center bg-no-repeat"
          :style="{ backgroundImage: `url(${media?.backdrop_path.original})` }"
        >
          <div
            class="min-h-screen w-full bg-gradient-to-br from-custom-bg from-0% to-transparent pb-16 pt-32 backdrop-blur-sm sm:pt-40"
          >
            <BaseContainer>
              <h1 class="text-2xl font-bold sm:text-4xl xl:text-7xl">{{ title }}</h1>
              <p
                class="mt-2 flex flex-wrap items-center gap-3 text-sm text-custom-foreground-secondary sm:text-base"
              >
                <span>{{ releaseDate }}</span>
                <Separator v-if="runtime" orientation="vertical" class="!h-3.5" />
                <span v-if="runtime">{{ runtime }}</span>
                <Separator orientation="vertical" class="!h-3.5" />
                <span>{{ formmattedGenres }}</span>
                <span
                  v-if="rating"
                  class="rounded bg-custom-primary px-2 text-base font-medium text-custom-foreground sm:text-xl"
                >
                  {{ rating }}
                </span>
              </p>
              <p v-if="media?.overview" class="mt-5 max-w-3xl sm:text-lg">
                {{ media?.overview }}
              </p>
              <div class="mt-8 flex flex-col items-center gap-4 sm:flex-row">
                <Button class="rounded-full bg-custom-primary hover:bg-custom-primary/90" @click="handleShowPlayer">
                  <IconPlayCircle stroke-width="1.5" :size="20" />
                  <span class="pl-2 font-medium sm:text-lg">Watch Now</span>
                </Button>
                <VideoTrailerDialog v-if="media" :id="media?.id" :media-type="mediaType">
                  <Button variant="outline" class="rounded-full bg-transparent">
                    <IconPlayCircle stroke-width="1.5" :size="20" />
                    <span class="pl-2 font-medium sm:text-lg">Watch Trailer</span>
                  </Button>
                </VideoTrailerDialog>
                <Button variant="ghost" class="rounded-full">
                  <IconPlusCircle stroke-width="1.5" :size="18" />
                  <span class="pl-2 font-medium sm:text-lg"> My List </span>
                </Button>
              </div>
              <div v-if="casts?.length" class="mt-5 sm:mt-10">
                <h2 class="text-xl">Cast</h2>
                <div
                  class="mt-5 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-5 sm:items-start md:gap-6 lg:flex"
                >
                  <CastAvatar :casts="casts" />
                </div>
              </div>
              <div v-if="images?.length" class="mt-10">
                <h2 class="text-xl">Photos</h2>

                <div
                  class="mt-5 grid grid-cols-2 place-items-center gap-4 sm:flex sm:flex-wrap sm:items-center"
                >
                  <PhotoList :photos="images" />
                </div>
              </div>
            </BaseContainer>
          </div>
        </div>
        <div v-if="similarMedias?.length" class="mb-16 mt-36">
          <MediaCarousel title="You might also like" :medias="similarMedias" />
        </div>
      </template>
      <template #fallback>
        <div class="grid h-svh place-items-center">
          <IconLoaderCircle class="animate-spin text-custom-primary" :size="64" />
        </div>
      </template>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import AppPlayer from '~/components/AppPlayer.vue'
import type { Movie, TV, Genre } from '~/types/media'

definePageMeta({
  key: route => route.fullPath,
  validate: async (route) => {
    return (route.params.type === 'movie' || route.params.type === 'tv-show') && typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
  }
})

const route = useRoute()
const showPlayer = ref<boolean>(false)
const isPlaying = ref<boolean>(false)
let timeout: ReturnType<typeof setTimeout>

const type = computed<string>(() => {
  if (route.params.type === 'movie') {
    return 'movies'
  } else if (route.params.type === 'tv-show') {
    return 'tv'
  } else {
    return ''
  }
})

const { data } = await useAsyncData(`media:${route.params.id}`, async () => {
  const [media, casts, images, similar] = await Promise.all([
    $fetch<Movie | TV>(`/api/${type.value}/details`, {
      params: {
        id: route.params.id
      }
    }),
    $fetch(`/api/${type.value}/casts`, {
      params: {
        id: route.params.id
      }
    }),
    $fetch(`/api/${type.value}/images`, {
      params: {
        id: route.params.id
      }
    }),
    $fetch(`/api/${type.value}/similar`, {
      params: {
        id: route.params.id
      }
    })
  ])

  return { media, casts, images, similar }
})

const media = computed(() => {
  return data.value?.media
})

const mediaType = computed(() => {
  if (media.value) {
    if ('title' in media.value) {
      return 'movie'
    } else if ('name' in media.value) {
      return 'tv'
    }
  }
  return ''
})

const title = computed(() => {
  return media.value ? useTitle(media.value) : ''
})

const releaseDate = computed(() => {
  return media.value ? useReleaseDate(media.value) : ''
})

const runtime = computed(() => {
  return media.value ? useRuntime(media.value) : null
})

const formmattedGenres = computed<string>(() => {
  return media.value?.genres?.map((genre: Genre) => genre.name).join(', ') || ''
})

const rating = computed(() => {
  return media.value ? useRating(media.value) : null
})

const casts = computed(() => {
  return data.value?.casts
})

const images = computed(() => {
  return data.value?.images
})

const similarMedias = computed(() => {
  return data.value?.similar
})

onMounted(() => {
  if (route.query.play) {
    handleShowPlayer()
    return
  }
})

function handleShowPlayer() {
  showPlayer.value = !showPlayer.value
  window.scrollTo({ top: 0, behavior: 'smooth' })

  if (showPlayer.value) {
    document.getElementById('header')?.classList.add('hidden')
    document.getElementById('footer')?.classList.add('hidden')

    timeout = setTimeout(() => {
      isPlaying.value = true
    }, 1500)
  } else {
    document.getElementById('header')?.classList.remove('hidden')
    document.getElementById('footer')?.classList.remove('hidden')

    isPlaying.value = false
    if (timeout) clearTimeout(timeout)
  }
}
</script>
