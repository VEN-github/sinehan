<template>
  <BaseContainer>
    <div class="mb-8" :class="{ 'flex items-center justify-between': link }">
      <div class="flex items-center gap-x-4" :class="{ 'justify-between': !link }">
        <h2 class="text-sm font-semibold xs:text-lg sm:text-2xl xl:text-3xl 2xl:text-4xl">
          {{ title }}
        </h2>
        <div class="nav-container hidden sm:flex sm:items-center">
          <button
            type="button"
            class="nav-button disabled:text-primary"
            @click="carouselEl?.slidePrev"
          >
            <IconChevronLeft />
          </button>
          <button
            type="button"
            class="nav-button disabled:text-primary"
            @click="carouselEl?.slideNext"
          >
            <IconChevronRight />
          </button>
        </div>
      </div>
      <NuxtLink
        v-if="link"
        :to="link"
        class="flex items-center gap-x-1 text-sm font-medium text-custom-accent sm:text-base"
      >
        View all
        <IconChevronRight :size="18" />
      </NuxtLink>
    </div>
    <div
      class="mx-auto w-full max-w-60 xs:max-w-[300px] sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-[1100px] 2xl:max-w-7xl"
    >
      <BaseCarousel
        ref="carouselEl"
        :options="options"
        style="--f-carousel-slide-padding: 0 1rem; --f-carousel-slide-width: fit-content"
      >
        <BaseCarouselSlide v-for="media in medias" :key="media.id">
          <MediaCardGrid :media="media" />
        </BaseCarouselSlide>
      </BaseCarousel>
    </div>
  </BaseContainer>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Movie, TV } from '~/types/media'
import type { BaseCarousel } from '#build/components'

defineProps<{
  title: string
  medias: (Movie | TV)[]
  link?: string
}>()

const carouselEl = ref<InstanceType<typeof BaseCarousel> | null>(null)
const options = reactive({
  slidesPerPage: 1,
  transition: 'slide',
  Navigation: false,
  Dots: false
})
</script>
