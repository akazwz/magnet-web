import cheerio from 'cheerio'
import type { Torrent } from './index'
import { getHtml } from './index'

export const rarbg = async (query: string, page: number = 1) => {
  const urls: string[] = []
  const torrents: Torrent[] = []
  const url = 'https://rargb.to/search/' + page + '/?search=' + query
  const html = await getHtml(url)
  if (!html) return null
  console.log(url)
  const $ = cheerio.load(html)

  /* 获取除 Magnet 外的所有信息 */
  $('table.lista2t tbody').each((_, element) => {
    $('tr.lista2').each((_, el) => {
      const td = $(el).children('td')
      const Name = $(td).eq(1).find('a').attr('title') || ''
      const Category = $(td).eq(2).find('a').text()
      const DateUploaded = $(td).eq(3).text()
      const Size = $(td).eq(4).text()
      const Seeders = $(td).eq(5).find('font').text()
      const Leechers = $(td).eq(6).text()
      const UploadedBy = $(td).eq(7).text()
      const Url = 'https://rargb.to' + $(td).eq(1).find('a').attr('href')
      const Magnet = ''
      urls.push(Url)
      torrents.push({
        Name,
        Category,
        DateUploaded,
        Size,
        Seeders,
        Leechers,
        UploadedBy,
        Url,
        Magnet,
      })
    })
  })

  /* 遍历获取 Magnet, 根据 url判断是否为同一个magnet */
  await Promise.all(urls.map(async (url: string) => {
    for (let i = 0; i < url.length; i++) {
      if (torrents[i].Url === url) {
        let html: string | null
        try {
          html = await getHtml(url)
        } catch (e: unknown) {
          return null
        }
        if (!html) return null
        const $ = cheerio.load(html)
        torrents[i].Magnet = $('tr:nth-child(1) > td:nth-child(2) > a:nth-child(3)').attr('href') || ''
      }
    }
  }))

  return torrents
}