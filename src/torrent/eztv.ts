import cheerio from 'cheerio'
import type { Torrent } from './index'
import { getHtml } from './index'

export const ezTV = async (query: string) => {
  const torrents: Torrent[] = []
  const url = `https://eztv.re/search/${query} `
  const html = await getHtml(url)
  if (!html) return null
  const $ = cheerio.load(html)

  $('tbody tr').each((_, element) => {
    const url = $(element).find('td').eq(1).find('a').attr('href') || ''
    const name = $(element).find('td').eq(1).find('a').text() || ''
    if (url !== '' || name !== '') {
      if (!name.match((new RegExp(query.replace(/(\W|\s)/ig, '(\\W|\\s|).?'), 'ig')))) return
      const torrent: Torrent = {
        Name: name,
        Size: $(element).find('td').eq(3).text(),
        Seeders: $(element).find('td').eq(5).text(),
        DateUploaded: $(element).find('td').eq(4).text(),
        Url: 'https://eztv.io' + url,
        Magnet: $(element).find('td').eq(2).find('a').attr('href') || ''
      }
      if (torrent.Name !== '') {
        torrents.push(torrent)
      }
    }
  })
  return torrents
}