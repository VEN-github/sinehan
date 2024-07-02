import type { Movie, TV, Genre } from '~/types/media'

export default function useGenres(media: Movie | TV, movieGenres: Genre[], tvGenres: Genre[]) {
  let genreNames: (string | undefined)[] = []

  if ('release_date' in media && media.genre_ids?.length) {
    genreNames = media.genre_ids.map(
      (id: number) => movieGenres.find((genre: Genre) => genre.id === id)?.name
    )
  }

  if ('first_air_date' in media && media.genre_ids?.length) {
    genreNames = media.genre_ids.map(
      (id: number) => tvGenres.find((genre: Genre) => genre.id === id)?.name
    )
  }

  const genres = formatGenres(genreNames)
  const genreNamesString = genreNames?.join(', ') || ''

  return {
    genres,
    genreNamesString
  }
}

function formatGenres(genres: (string | undefined)[]) {
  return genres.length > 2 ? genres.slice(0, 2).concat(['...']).join(', ') : genres.join(', ')
}
