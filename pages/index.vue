<template>
  <section>
    <ClientOnly fallback-tag="div">
      <BaseCarousel ref="carouselEl" :options="options" autoplay>
        <BaseCarouselSlide
          v-for="(result, index) in trending?.results"
          :key="index + 'e' + result.id"
        >
          <HeroSection :media="result" :genres="genres" />
          <div class="dots-container"></div>
        </BaseCarouselSlide>
      </BaseCarousel>
      <template #fallback>
        <div class="grid h-svh place-items-center">
          <IconLoaderCircle class="animate-spin text-custom-primary" :size="64" />
        </div>
      </template>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import type { APIResponse } from '~/types/api'
import type { Movie, TV, Genre } from '~/types/media'
import type { BaseCarousel } from '#build/components'

const { data } = useAsyncData(async () => {
  const [trending, movie_genres, tv_genres] = await Promise.all([
    $fetch<APIResponse<(Movie | TV)[]>>('/api/trending'),
    $fetch<{ genres: Genre[] }>('/api/genres/movie'),
    $fetch<{ genres: Genre[] }>('/api/genres/tv')
  ])

  return { trending, movie_genres, tv_genres }
})

const carouselEl = ref<InstanceType<typeof BaseCarousel> | null>(null)
const options = reactive({
  Panzoom: {
    touch: false
  },
  Navigation: false,
  Dots: {
    classes: {
      list: 'f-carousel__dots dots-container',
      hasDots: ''
    },
    dynamicFrom: 5
  },
  transition: 'classic',
  Autoplay: {
    timeout: 3000,
    showProgress: false
  }
})

const trending = computed(() => {
  return data.value?.trending
})

const genres = computed(() => {
  return {
    movie: data.value?.movie_genres.genres,
    tv: data.value?.tv_genres.genres
  }
})

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  carouselEl.value?.destroyCarousel()
  options.Panzoom.touch = window.innerWidth <= 1024 ? true : false
  carouselEl.value?.initCarousel()
}
</script>
