import { pirateBay } from './pirate-bay'

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

export {
  pirateBay
}