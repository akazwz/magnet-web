import type { NextApiRequest, NextApiResponse } from 'next'
import { ezTV } from '../../../src/torrent'

type Res = {
  code: number
  data: any
  msg: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Res>) {
  const { query } = req.query
  if (typeof query !== 'string') {
    res.status(400).json({ code: 4000, data: null, msg: '参数错误' })
    return
  }

  const data = await ezTV(query)

  res.status(200).json({
    data,
    code: 2000,
    msg: '获取成功'
  })
}
