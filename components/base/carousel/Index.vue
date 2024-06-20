<template>
  <div ref="carouselEl" class="f-carousel">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { Carousel } from '@fancyapps/ui/dist/carousel/carousel.esm.js'
import '@fancyapps/ui/dist/carousel/carousel.css'
import { Autoplay } from '@fancyapps/ui/dist/carousel/carousel.autoplay.esm.js'
import '@fancyapps/ui/dist/carousel/carousel.autoplay.css'

const props = defineProps<{
  options?: unknown
  autoplay?: boolean
}>()

const carousel = ref<Carousel | null>(null)
const carouselEl = ref<HTMLElement | null>(null)

defineExpose({
  carousel,
  initCarousel,
  destroyCarousel,
  slideNext,
  slidePrev
})

onMounted(() => {
  initCarousel()
})

function initCarousel() {
  carousel.value = new Carousel(
    carouselEl.value,
    props.options,
    props.autoplay ? { Autoplay } : null
  )
}

function destroyCarousel() {
  carousel.value?.destroy()
}

function slideNext() {
  carousel.value?.slideNext()
}

function slidePrev() {
  carousel.value?.slidePrev()
}
</script>
