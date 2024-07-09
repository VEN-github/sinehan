import useTMDBConfig from '~/composables/useTMDBConfig'
import type { APIResponse } from '~/types/api'
import type { Review } from '~/types/media'
import { DEFAULT_POSTER_URL, PROFILE_URL } from '~/constants/image'

export default defineEventHandler(async (event) => {
  const config = useTMDBConfig()
  const query = getQuery(event)

  const response = await $fetch<APIResponse<Review[]>>(
    `/movie/${query.id}/reviews?language=en-US&page=1`,
    config
  )

  const results = response.results.map((item: Review) => {
    return {
      ...item,
      author_details: {
        name: item.author_details.username,
        username: item.author_details.username,
        avatar_path: item.author_details.avatar_path
          ? {
              small: `${PROFILE_URL.small}${item.author_details.avatar_path}`,
              medium: `${PROFILE_URL.medium}${item.author_details.avatar_path}`
            }
          : {
              small: DEFAULT_POSTER_URL.medium,
              large: DEFAULT_POSTER_URL.large
            },
        rating: item.author_details.rating
      }
    }
  })

  return results
})
