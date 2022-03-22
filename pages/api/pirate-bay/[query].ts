import type { NextApiRequest, NextApiResponse } from 'next'
import { pirateBay } from '../../../src/torrent'

type Res = {
  code: number
  data: any
  msg: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Res>) {
  const { query, page } = req.query
  if (typeof query !== 'string') {
    res.status(400).json({ code: 4000, data: null, msg: '参数错误' })
    return
  }
  let p = 1
  if (Number(page) > 1) {
    p = Number(page)
  }

  const data = await pirateBay(query, p)

  res.status(200).json({
    data,
    code: 2000,
    msg: '获取成功'
  })
}
