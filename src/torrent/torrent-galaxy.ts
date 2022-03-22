import cheerio from 'cheerio'
import type { Torrent } from './index'
import { getHtml } from './index'

export const torrentGalaxy = async (query: string, page: number = 0) => {
  if (page !== 0) {
    page = page - 1
  }

  const torrents: Torrent[] = []
  const url = `https://tgx.rs/torrents.php?search=${query}&sort=id&order=desc&page=${page}`
  const html = await getHtml(url)
  if (!html) return null
  const $ = cheerio.load(html)

  $('div.tgxtablerow.txlight').each((i, element) => {
    const torrent: Torrent = {
      Name: $(element).find(':nth-child(4) div a b').text(),
      Category: $(element).find(':nth-child(1) a small').text(),
      Url: 'https://torrentgalaxy.to' + $(element).find('a.txlight').attr('href'),
      UploadedBy: $(element).find(':nth-child(7) span a span').text(),
      Size: $(element).find(':nth-child(8)').text(),
      Seeders: $(element).find(':nth-child(11) span font:nth-child(1)').text(),
      Leechers: $(element).find(':nth-child(11) span font:nth-child(2)').text(),
      DateUploaded: $(element).find(':nth-child(12)').text(),
      Magnet: $(element).find('.tgxtablecell.collapsehide.rounded.txlight a').next().attr('href') || '',
    }
    if (torrent.Name !== '') {
      torrents.push(torrent)
    }
  })

  return torrents
}