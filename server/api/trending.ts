import useTMDBConfig from '~/composables/useTMDBConfig'
import type { APIResponse } from '~/types/api'
import type { Movie, TV } from '~/types/media'
import { BACKDROP_URL, POSTER_URL, DEFAULT_POSTER_URL } from '~/constants/image'

export default defineEventHandler(async () => {
  const config = useTMDBConfig()

  const response = await $fetch<APIResponse<(Movie | TV)[]>>(
    `/trending/all/day?language=en-US`,
  config
  )

  const filteredResults = response.results.filter((result: Movie | TV) => {
    return result.media_type === 'movie' || result.media_type === 'tv'
  })
  filteredResults.forEach((result: Movie | TV) => {
    result.poster_path = result.poster_path
      ? `${POSTER_URL.large}${result.poster_path}`
      : DEFAULT_POSTER_URL.large
    result.backdrop_path = {
      small: `${BACKDROP_URL.small}${result.backdrop_path}`,
      medium: `${BACKDROP_URL.medium}${result.backdrop_path}`,
      large: `${BACKDROP_URL.large}${result.backdrop_path}`,
      original: `${BACKDROP_URL.original}${result.backdrop_path}`
    }
  })

  const formattedResponse = {
    ...response,
    results: filteredResults
  }

  return formattedResponse
})
