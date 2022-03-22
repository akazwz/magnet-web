import type { NextApiRequest, NextApiResponse } from 'next'
import { pirateBay } from '../../src/torrent'
import { rarbg } from '../../src/torrent'

type Res = {
  code: number
  data: any
  msg: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Res>) {
  const torrentsPirateBay = await pirateBay('1080')
  const torrentsRarbg = await rarbg('1080')

  res.status(200).json({
    code: 2000,
    data: {
      pirateBay: torrentsPirateBay,
      rarbg: torrentsRarbg,
    },
    msg: '获取成功'
  })
}
