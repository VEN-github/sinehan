import useTMDBConfig from '~/composables/useTMDBConfig'
import useMediaImage from '~/composables/useMediaImage'
import type { Movie } from '~/types/media'

export default defineEventHandler(async (event) => {
  const config = useTMDBConfig()
  const query = getQuery(event)
  const result = []

  const response = await $fetch<Movie>(`/movie/${query.id}?language=en-US`, config)
  result.push(response)

  useMediaImage(result)

  return response
})
