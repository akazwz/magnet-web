import cheerio from 'cheerio'
import type { Torrent } from './index'
import { getHtml } from './index'

export const bitSearch = async (query: string, page: number = 1) => {
  const torrents: Torrent[] = []
  const url = `https://bitsearch.to/search?q=${query}&page=${page}&sort=seeders`
  const html = await getHtml(url)
  if (!html) return null
  const $ = cheerio.load(html)

  $('li.search-result.view-box').each((_, element) => {
    const size = $(element).find('.info div div').eq(2).text()
    if (size) {
      const torrent: Torrent = {
        Name: $(element).find('.info h5 a').text().trim(),
        Size: $(element).find('.info div div').eq(2).text().trim(),
        Downloads: $(element).find('.info div div').eq(1).text().trim(),
        Seeders: $(element).find('.info div div').eq(3).text().trim(),
        Leechers: $(element).find('.info div div').eq(4).text().trim(),
        DateUploaded: $(element).find('.info div div').eq(5).text().trim(),
        Url: 'https://bitsearch.to' + $(element).find('.info h5 a').attr('href'),
        Magnet: $(element).find('.links a').next().attr('href') || ''
      }
      if (torrent.Name !== '') {
        torrents.push(torrent)
      }
    }
  })
  return torrents
}