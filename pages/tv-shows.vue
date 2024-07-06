<template>
  <section>
    <ClientOnly fallback-tag="div">
      <div v-if="pending" class="grid h-svh place-items-center">
        <IconLoaderCircle class="animate-spin text-custom-primary" :size="64" />
      </div>
      <Media
        v-else
        :medias="tv?.results"
        :genres="genres"
        :selected-genres="selectedGenres"
        @handle-filter="selectGenre"
        @remove-filter="removeGenre"
        @hide-pagination="showPagination = false"
        @clear-filters="clearFilters"
      />
      <div v-if="showPagination" class="mb-8 mt-16 flex justify-center">
        <Pagination
          v-model:page="page"
          :total="500"
          :show-edges="showPaginationEdges"
          :sibling-count="1"
          :default-page="1"
        >
          <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst
              class="size-8 border-0 bg-primary hover:bg-custom-primary xs:size-10"
            />
            <PaginationPrev class="size-8 border-0 bg-primary hover:bg-custom-primary xs:size-10" />
            <template v-for="(item, index) in items">
              <PaginationListItem
                v-if="item.type === 'page'"
                :key="index"
                :value="item.value"
                as-child
              >
                <Button
                  class="size-8 p-0 hover:bg-custom-primary xs:size-10"
                  :class="{ 'bg-custom-primary': item.value === page }"
                >
                  {{ item.value }}
                </Button>
              </PaginationListItem>
              <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>
            <PaginationNext class="size-8 border-0 bg-primary hover:bg-custom-primary xs:size-10" />
            <PaginationLast class="size-8 border-0 bg-primary hover:bg-custom-primary xs:size-10" />
          </PaginationList>
        </Pagination>
      </div>
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
import type { TV, Genre } from '~/types/media'

useHead({
  title: 'TV Shows'
})

const page = ref<number>(1)
const showPaginationEdges = ref<boolean>(false)
const selectedGenres = ref<Genre[]>([])
const showPagination = ref<boolean>(true)

watch(page, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

const { data, pending } = await useAsyncData(
  'tv',
  async () => {
    const [tv, genres] = await Promise.all([
      $fetch<APIResponse<TV[]>>('/api/tv/discover', {
        params: {
          page: page.value
        }
      }),
      $fetch<{ genres: Genre[] }>('/api/genres/tv')
    ])

    return { tv, genres }
  },
  {
    watch: [page]
  }
)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Not Found' })
}

const tv = computed(() => {
  return data.value?.tv
})

const genres = computed(() => {
  return data.value?.genres.genres
})

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  showPaginationEdges.value = window.innerWidth >= 640
}

function selectGenre(genre: Genre) {
  const index = selectedGenres.value.findIndex(
    (selectedGenre: Genre) => selectedGenre.id === genre.id
  )

  if (index === -1) {
    selectedGenres.value.push(genre)
  }
}

function removeGenre(id: number): void {
  const index = selectedGenres.value.findIndex((genre: Genre) => genre.id === id)
  selectedGenres.value.splice(index, 1)
}

function clearFilters() {
  selectedGenres.value = []
  showPagination.value = true
}
</script>
