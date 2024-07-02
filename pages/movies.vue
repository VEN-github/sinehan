<template>
  <Media :medias="movies?.results" />
</template>

<script setup lang="ts">
import type { APIResponse } from '~/types/api'
import type { Movie } from '~/types/media'

const page = ref<number>(1)

const { data: movies } = await useFetch<APIResponse<Movie[]>>('/api/movies/discover', {
  params: {
    page: page.value
  },
  watch: [page],
  transform: (data: APIResponse<Movie[]>) => {
    return {
      ...data,
      results: data.results.map((movie: Movie) => ({ ...movie, media_type: 'movie' }))
    }
  }
})
</script>
