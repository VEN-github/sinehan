import useTMDBConfig from '~/composables/useTMDBConfig'
import type { Cast, Photo } from '~/types/media'
import { DEFAULT_POSTER_URL, PROFILE_URL } from '~/constants/image'

interface Response {
  id: number
  cast: Cast<Photo>[]
}

export default defineEventHandler(async (event) => {
  const config = useTMDBConfig()
  const query = getQuery(event)

  const response = await $fetch<Response>(`/tv/${query.id}/credits?language=en-US`, config)

  const results = response.cast.map((item: Cast<Photo>) => {
    return {
      id: item.id,
      name: item.name,
      character: item.character,
      profile_path: item.profile_path
        ? {
            medium: `${PROFILE_URL.medium}${item.profile_path}`,
            large: `${PROFILE_URL.large}${item.profile_path}`
          }
        : {
            medium: DEFAULT_POSTER_URL.medium,
            large: DEFAULT_POSTER_URL.large
          }
    }
  })

  return results
})
