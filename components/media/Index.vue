<template>
  <div class="pt-32 sm:pt-36 lg:pt-40 2xl:pt-44">
    <BaseContainer>
      <div
        v-if="filteredMedias?.length"
        class="filter-container flex flex-wrap items-center justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <div class="relative inline-block text-left">
            <div>
              <button
                type="button"
                class="group inline-flex items-center justify-center font-medium"
                @click="isShow = !isShow"
              >
                Genre
                <IconChevronDown
                  :size="18"
                  class="-mr-1 ml-1 flex-shrink-0 transition-transform"
                  :class="{ 'rotate-180': isShow }"
                />
              </button>
            </div>
            <div
              v-if="isShow"
              v-on-click-outside="() => (isShow = false)"
              class="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              tabindex="-1"
            >
              <div class="h-72 overflow-y-auto py-1" role="none">
                <button
                  v-for="genre in genres"
                  :key="genre.id"
                  type="button"
                  class="block w-full px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100"
                  role="menuitem"
                  @click="selectGenre(genre)"
                >
                  {{ genre.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="space-x-3">
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
      <div v-if="selectedGenres.length" class="mt-3 flex flex-wrap items-center gap-2">
        <span
          v-for="genre in selectedGenres"
          :key="genre.id"
          class="flex items-center gap-x-1.5 rounded-full bg-custom-accent px-3 py-1 text-sm font-medium"
        >
          {{ genre.name }}
          <button type="button" @click="removeGenre(genre.id)"><IconX :size="13" /></button>
        </span>
      </div>
      <template v-if="filteredMedias?.length">
        <div
          v-if="layout === 'grid'"
          class="mt-5 grid grid-cols-2 place-items-center gap-8 xs:gap-4 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4 xl:grid-cols-5"
        >
          <template v-for="media in filteredMedias" :key="media.id">
            <MediaCardGrid :media="media" :img-width="imgWidth" />
          </template>
        </div>
        <div
          v-if="layout === 'list'"
          class="mt-7 grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-3"
        >
          <template v-for="media in filteredMedias" :key="media.id">
            <MediaCardList :media="media" :img-width="imgWidth" />
          </template>
        </div>
      </template>
      <div v-else class="flex flex-col items-center justify-center py-16 text-center">
        <IconArchiveX :size="48" />
        <h1 class="mt-5 text-2xl font-bold tracking-tight sm:text-5xl">
          No matching records found.
        </h1>
        <p class="text-custom-foreground-secondary mb-6 mt-2">
          Sorry, we couldn't find any data matching your request.
        </p>
        <Button class="bg-custom-primary hover:bg-custom-primary/90" @click="emit('clearFilters')">
          Clear Filters
        </Button>
      </div>
    </BaseContainer>
  </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import type { Movie, TV, Genre } from '~/types/media'

const props = defineProps<{
  medias: (Movie | TV)[] | undefined
  genres: Genre[] | undefined
  selectedGenres: Genre[]
}>()

const emit = defineEmits(['handleFilter', 'removeFilter', 'hidePagination', 'clearFilters'])

const layout = useMediaLayout()
const imgWidth = ref<number>(200)
const isShow = ref<boolean>(false)

const filteredMedias = computed(() => {
  if (props.selectedGenres.length === 0) return props.medias

  return props.medias?.filter((media) => {
    return media.genre_ids?.some((genreId: number) =>
      props.selectedGenres.some((genre: Genre) => genreId === genre.id)
    )
  })
})

watch(filteredMedias, (newValue) => {
  if (!newValue?.length) emit('hidePagination')
})

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

function selectGenre(genre: Genre) {
  isShow.value = false
  emit('handleFilter', genre)
}

function removeGenre(id: number): void {
  emit('removeFilter', id)
}
</script>
