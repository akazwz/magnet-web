import cheerio from 'cheerio'
import type { Torrent } from './index'
import { getHtml } from './index'

export const gloTorrents = async (query: string, page: number = 1) => {
  const torrents: Torrent[] = []
  const url = `https://gtdb.cc/search_results.php?search=${query}&sort=seeders&order=desc&page=${page}`
  const html = await getHtml(url)
  if (!html) return null
  const $ = cheerio.load(html)

  $('.ttable_headinner tr').each((_, element) => {
    const torrent: Torrent = {
      Name: $(element).find('td').eq(1).find('a').text().trim(),
      Size: $(element).find('td').eq(4).text(),
      UploadedBy: $(element).find('td').eq(7).find('a b font').text(),
      Seeders: $(element).find('td').eq(5).find('font b').text(),
      Leechers: $(element).find('td').eq(6).find('font b').text(),
      Url: 'https://glodls.to' + $(element).find('td').eq(1).find('a').next().attr('href'),
      Magnet: $(element).find('td').eq(3).find('a').attr('href') || ''
    }
    if (torrent.Name !== '') {
      torrents.push(torrent)
    }
  })
  return torrents
}