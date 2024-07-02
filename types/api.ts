export type APIResponse<T> = {
  page?: number
  results: T
  total_pages?: number
  total_results?: string
}
