import useTMDBConfig from '~/composables/useTMDBConfig'
import useMediaImage from '~/composables/useMediaImage'
import type { APIResponse } from '~/types/api'
import type { Movie } from '~/types/media'

export default defineEventHandler(async () => {
  const config = useTMDBConfig()

  const response = await $fetch<APIResponse<Movie[]>>(
    `/tv/airing_today?language=en-US&page=1`,
    config
  )

  useMediaImage(response.results)

  return response
})
