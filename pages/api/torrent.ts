import type { NextApiRequest, NextApiResponse } from 'next'
import { pirateBay } from '../../src/torrent'

type Res = {
  code: number
  data: any
  msg: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Res>) {
  const torrents = await pirateBay('1080')
  if (!torrents) {
    res.status(200).json({
      code: 4000,
      data: null,
      msg: '获取失败'
    })
    return
  }
  res.status(200).json({
    code: 2000,
    data: torrents,
    msg: '获取成功'
  })
}
