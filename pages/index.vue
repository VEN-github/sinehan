<template>
  <section>
    <ClientOnly fallback-tag="div">
      <BaseCarousel ref="carouselEl" :options="options" autoplay>
        <BaseCarouselSlide
          v-for="(result, index) in trending?.results"
          :key="index + 'e' + result.id"
        >
          <HeroSection :media="result" />
          <div class="dots-container"></div>
        </BaseCarouselSlide>
      </BaseCarousel>
      <template #fallback>
        <div class="grid h-dvh place-items-center">
          <IconLoaderCircle class="animate-spin text-custom-primary" :size="64" />
        </div>
      </template>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import type { APIResponse } from '~/types/api'
import type { Movie, TV } from '~/types/media'
import type { BaseCarousel } from '#build/components'

const { data: trending } = await useFetch<APIResponse<(Movie | TV)[]>>('/api/trending')

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
