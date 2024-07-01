import type { Movie, TV } from '~/types/media'

export default function useRating(media: Movie | TV) {
  let minute: number | undefined

  if (media && 'runtime' in media) {
    minute = media.runtime
  }

  if (media && 'episode_run_time' in media && media.episode_run_time?.length) {
    minute = media.episode_run_time[0]
  }

  if (!minute || isNaN(minute)) return null

  const hours = Math.floor(minute / 60)
  const remainingMinutes = minute % 60

  const hoursText = hours > 0 ? hours + 'h' : ''
  const minutesText = remainingMinutes > 0 ? remainingMinutes + 'min' : ''

  return hoursText + (hours > 0 && remainingMinutes > 0 ? ' ' : '') + minutesText
}
