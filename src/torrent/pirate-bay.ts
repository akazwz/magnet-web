import cheerio from 'cheerio'

export const pirateBay = async (query: string, page: number = 1) => {
  const torrents = []
  const url = 'https://thehiddenbay.com/search/' + query + '/' + page + '/99/0'
  let html: string
  try {
    const res = await fetch(url)
    html = await res.text()
  } catch (e: unknown) {
    console.log(e)
    return null
  }
  return html
}