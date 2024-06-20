import type { Movie, TV } from '~/types/media'

export default function useRating(media: Movie | TV) {
  return media.vote_average.toFixed(1)
}
