import useTMDBConfig from '~/composables/useTMDBConfig'
import useMediaImage from '~/composables/useMediaImage'
import type { APIResponse } from '~/types/api'
import type { Movie, TV } from '~/types/media'

export default defineEventHandler(async (event) => {
  const config = useTMDBConfig()
  const query = getQuery(event)
  const search = query.search as string

  const response = await $fetch<APIResponse<(Movie | TV)[]>>(
    `/search/multi?query=${encodeURI(search)}&include_adult=false&language=en-US&page=1'`,
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
