import useTMDBConfig from '~/composables/useTMDBConfig'
import useMediaImage from '~/composables/useMediaImage'
import type { APIResponse } from '~/types/api'
import type { Movie, TV } from '~/types/media'

export default defineEventHandler(async () => {
  const config = useTMDBConfig()

  const response = await $fetch<APIResponse<(Movie | TV)[]>>(
    `/trending/all/day?language=en-US`,
  config
  )

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
