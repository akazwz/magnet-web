export const getPirateBay = async (query: string, page: number = 1) => {
  return fetch(`/api/pirate-bay/${query}?page=${page}`)
}