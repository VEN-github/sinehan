import useTMDBConfig from '~/composables/useTMDBConfig'
import useMediaImage from '~/composables/useMediaImage'
import type { APIResponse } from '~/types/api'
import type { Movie } from '~/types/media'

export default defineEventHandler(async (event) => {
  const config = useTMDBConfig()
  const query = getQuery(event)

  const response = await $fetch<APIResponse<Movie[]>>(
    `/movie/${query.id}/similar?language=en-US&page=1`,
    config
  )

  useMediaImage(response.results)

  const formattedResponse = response.results.map((movie: Movie) => ({
    ...movie,
    media_type: 'movie'
  }))

  return formattedResponse
})
