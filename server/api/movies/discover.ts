import useTMDBConfig from '~/composables/useTMDBConfig'
import useMediaImage from '~/composables/useMediaImage'
import type { APIResponse } from '~/types/api'
import type { Movie } from '~/types/media'

export default defineEventHandler(async (event) => {
  const config = useTMDBConfig()
  const query = getQuery(event)

  const response = await $fetch<APIResponse<Movie[]>>(
    `/discover/movie?language=en-US&page=${query.page}`,
    config
  )

  useMediaImage(response.results)

  return response
})
