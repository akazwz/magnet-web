import cheerio from 'cheerio'
import axios from 'axios'
import type { Torrent } from './index'

const getHtml = async (url: string): Promise<string | null> => {
  /* 开发环境 */
  if (process.env.NODE_ENV === 'development') {
    try {
      const puppeteer = require('puppeteer')
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto(url)
      return await page.content()
    } catch (e: unknown) {
      console.log(e)
      return null
    }
  } else {
    /* 生产环境 */
    try {
      const res = await axios.get(url)
      return await res.data
    } catch (e: unknown) {
      console.log(e)
      return null
    }
  }
}

export const pirateBay = async (query: string, page: number = 1) => {
  const torrents: Torrent[] = []
  const url = 'https://thehiddenbay.com/search/' + query + '/' + page + '/99/0'
  const html = await getHtml(url)
  if (!html) return null
  console.log(url)
  const $ = cheerio.load(html)

  $('table#searchResult tr').each((_, element) => {
    const data = $(element).find('font.detDesc').text().replace(/(Size|Uploaded)/gi, '').replace(/ULed/gi, 'Uploaded').split(',').map(value => value.trim())
    const date = data[0]
    const size = data[1]
    const uploader = $(element).find('font.detDesc a').text()

    const torrent: Torrent = {
      Name: $(element).find('a.detLink').text(),
      Size: size,
      DateUploaded: date,
      Category: $(element).find('td.vertTh center a').eq(0).text(),
      Seeders: $(element).find('td').eq(2).text(),
      Leechers: $(element).find('td').eq(3).text(),
      UploadedBy: uploader,
      Url: $(element).find('a.detLink').attr('href'),
      Magnet: $(element).find('td div.detName').next().attr('href')
    }

    if (torrent.Name.length) {
      torrents.push(torrent)
    }
  })
  return torrents
}