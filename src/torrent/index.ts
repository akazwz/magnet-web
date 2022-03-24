import axios from 'axios'
import { pirateBay } from './pirate-bay'
import { nyaaSi } from './nyaa-si'
import { torrentGalaxy } from './torrent-galaxy'
import { bitSearch } from './bit-search'
import { ezTV } from './eztv'
import { zooqle } from './zooqle'
import { rarbg } from './rarbg'

export type Torrent = {
  Name: string
  Size: string
  Url: string
  Magnet: string
  Seeders: string
  DateUploaded?: string
  Leechers?: string
  Category?: string
  UploadedBy?: string
  Downloads?: string
  Age?: string
  Torrent?: string
}

export const getHtml = async (url: string): Promise<string | null> => {
  /* 开发环境 */
  if (process.env.NODE_ENV === 'development') {
    try {
      const puppeteer = require('puppeteer')
      const browser = await puppeteer.launch({ headless: true })
      const page = await browser.newPage()
      await page.goto(url)
      const content = await page.content()
      await page.close()
      await browser.close()
      return content
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
  pirateBay,
  nyaaSi,
  torrentGalaxy,
  bitSearch,
  ezTV,
  zooqle,
  rarbg,
}