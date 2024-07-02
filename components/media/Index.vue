<template>
  <div class="pt-32 sm:pt-36 lg:pt-40 2xl:pt-44">
    <BaseContainer>
      <div class="flex flex-wrap items-center justify-between gap-4">
        <!-- <div class="flex items-center gap-2">
        <select v-model="filters.type" class="bg-transparent outline-none">
          <option class="bg-custom-bg" value="all">All</option>
          <option class="bg-custom-bg" value="popular">Popular</option>
          <option class="bg-custom-bg" value="top-rated">Top Rated</option>
        </select>
        <Separator orientation="vertical" class="!h-4" />
        <select
          ref="genreDropdown"
          class="bg-transparent outline-none"
          @change="handleGenreFilter"
        >
          <option class="bg-custom-bg" selected disabled>Genre</option>
          <option v-for="genre in genres" :key="genre.id" class="bg-custom-bg" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>
      </div> -->
        <div v-if="medias?.length" class="space-x-3">
          <button
            type="button"
            class="transition-colors hover:text-custom-primary"
            :class="{ 'text-custom-primary': layout === 'grid' }"
            @click="layout = 'grid'"
          >
            <IconLayoutGrid :size="24" />
          </button>
          <button
            type="button"
            class="transition-colors hover:text-custom-primary"
            :class="{ 'text-custom-primary': layout === 'list' }"
            @click="layout = 'list'"
          >
            <IconLayoutList :size="24" />
          </button>
        </div>
      </div>
      <div
        v-if="layout === 'grid'"
        class="mt-5 grid place-items-center gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <template v-for="media in medias" :key="media.id">
          <MediaCardGrid :media="media" :img-width="imgWidth" />
        </template>
      </div>
      <div
        v-if="layout === 'list'"
        class="mt-7 grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-3"
      >
        <template v-for="media in medias" :key="media.id">
          <MediaCardList :media="media" :img-width="imgWidth" />
        </template>
      </div>
    </BaseContainer>
  </div>
</template>

<script setup lang="ts">
import type { Movie, TV } from '~/types/media'

defineProps<{
  medias: (Movie | TV)[] | undefined
}>()

const layout = useMediaLayout()
const imgWidth = ref<number>(200)

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  imgWidth.value = window.innerWidth < 768 ? 342 : 200
}
</script>
