export default function useTMDBConfig() {
  const config = useRuntimeConfig()

  return {
    baseURL: config.public.tmdbPublicApiUrl,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${config.tmdbApiKey}`
    }
  }
}
