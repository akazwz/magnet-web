import cheerio from 'cheerio'
import type { Torrent } from './index'
import { getHtml } from './index'

export const nyaaSi = async (query: string, page: number = 1) => {
  const torrents: Torrent[] = []
  const url = 'https://nyaa.si/?f=0&c=0_0&q=' + query + '&p=' + page
  const html = await getHtml(url)
  if (!html) return null

  const regex = /.comments/gi
  const nameRegex = /[a-zA-Z\W].+/g

  const $ = cheerio.load(html)

  $('tbody tr').each((_, element) => {
    const $find = $(element)
    const torrent: Torrent = {
      Name: '',
      Size: '',
      Url: '',
      Magnet: '',
      DateUploaded: '',
      Category: '',
      Seeders: '',
      Leechers: '',
      UploadedBy: '',
      Downloads: '',
    }
    $find.each((_, element) => {
      const td = $(element).children('td')
      torrent.Name = $(element).find('td[colspan="2"] a').text().trim().match(nameRegex)![0]
      torrent.Category = $(element).find('a').attr('title') || ''
      torrent.Url = ('https://nyaa.si' + $(element).find('td[colspan="2"] a').attr('href')).replace(regex, '')

      $find.each((_, element) => {
        torrent.Size = $(td).eq(3).text()
        torrent.DateUploaded = $(td).eq(4).text()
        torrent.Seeders = $(td).eq(5).text()
        torrent.Leechers = $(td).eq(6).text()
        torrent.Downloads = $(td).eq(7).text()
        torrent.Magnet = $(element).find('.text-center a').next().attr('href') || ''
      })
    })

    torrents.push(torrent)
  })

  return torrents
}