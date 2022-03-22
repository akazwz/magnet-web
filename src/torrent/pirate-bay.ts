import cheerio from 'cheerio'

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

export const pirateBay = async (query: string, page: number = 1) => {
  const torrents: Torrent[] = []
  const url = 'https://thehiddenbay.com/search/' + query + '/' + page + '/99/0'
  let html: string
  try {
    const res = await fetch(url)
    html = await res.text()
  } catch (e: unknown) {
    console.log(e)
    return null
  }

  const $ = cheerio.load(html)

  $('table#searchResult > tr').each((_, element) => {
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