export const getPirateBay = async (query: string, page: number = 1) => {
  return fetch(`/api/pirate-bay/${query}?page=${page}`)
}

export const getBitSearch = async (query: string, page: number = 1) => {
  return fetch(`/api/bit-search/${query}?page=${page}`)
}