import { pirateBay } from './pirate-bay'
import axios from 'axios'

export type Torrent = {
  Name: string
  Size: string
  DateUploaded: string
  Category: string
  Seeders: string
  Leechers: string
  UploadedBy: string
  Url: string | undefined
  Magnet: string | undefined
}

export const getHtml = async (url: string): Promise<string | null> => {
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
      const res = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36'
        }
      })
      return await res.data
    } catch (e: unknown) {
      console.log(e)
      return null
    }
  }
}

export {
  pirateBay
}