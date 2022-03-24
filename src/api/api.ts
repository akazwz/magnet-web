export const getMagnetsByApi = async (query: string, provider: string, page: number = 1) => {
  return fetch(`/api/${provider}/${query}?page=${page}`)
}
