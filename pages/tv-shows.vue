<template>
  <Media :medias="tv?.results" />
</template>

<script setup lang="ts">
import type { APIResponse } from '~/types/api'
import type { TV } from '~/types/media'

const page = ref<number>(1)

const { data: tv } = await useFetch<APIResponse<TV[]>>('/api/tv/discover', {
  params: {
    page: page.value
  },
  watch: [page],
  transform: (data: APIResponse<TV[]>) => {
    return {
      ...data,
      results: data.results.map((tv: TV) => ({ ...tv, media_type: 'tv' }))
    }
  }
})
</script>
