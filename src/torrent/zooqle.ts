import cheerio from 'cheerio'
import type { Torrent } from './index'
import { getHtml } from './index'

export const zooqle = async (query: string, page: number = 1) => {
  const torrents: Torrent[] = []
  const url = `https://zooqle.com/search?pg=${page}&q=${query}`
  const html = await getHtml(url)
  if (!html) return null
  const $ = cheerio.load(html)

  $('tbody tr').each((_, element) => {
    const seedersLeechers = $(element).find('td').eq(5).find('div').attr('title')?.trim().split('|') || []
    const seeders = seedersLeechers[0].replace('Seeders:', '').trim()
    const leechers = seedersLeechers[1].replace('Leechers:', '').trim()

    const torrent: Torrent = {
      Name: $(element).find('td').eq(1).find('a').text().trim(),
      Size: $(element).find('td').eq(3).find('div div').text().trim(),
      DateUploaded: $(element).find('td').eq(4).text().trim(),
      Seeders: seeders,
      Leechers: leechers,
      Url: 'https://zooqle.com' + $(element).find('td').eq(1).find('a').attr('href'),
      Magnet: $(element).find('td').eq(2).find('ul').find('li').eq(1).find('a').attr('href') || ''
    }

    if (torrent.Name !== '') {
      torrents.push(torrent)
    }
  })
  return torrents
}