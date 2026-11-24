import useTMDBConfig from '~/composables/useTMDBConfig'
import useMediaImage from '~/composables/useMediaImage'
import type { APIResponse } from '~/types/api'
import type { Movie, TV } from '~/types/media'

export default defineEventHandler(async (event) => {
  const config = useTMDBConfig()
  const query = getQuery(event)
  const search = typeof query.search === 'string' ? query.search.trim() : ''

  if (search.length < 2) {
    return {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0
    }
  }

  const response = await $fetch<APIResponse<(Movie | TV)[]>>('/search/multi', {
    ...config,
    params: {
      query: search,
      include_adult: false,
      language: 'en-US',
      page: 1
    }
  })

  const filteredResults = response.results.filter((result: Movie | TV) => {
    return result.media_type === 'movie' || result.media_type === 'tv'
  })

  useMediaImage(filteredResults)

  const formattedResponse = {
    ...response,
    results: filteredResults
  }

  return formattedResponse
})
