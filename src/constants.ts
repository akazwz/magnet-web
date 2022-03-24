import { TransPirateBayCardI } from './types'

export const TransPirateBayCard: Record<string, TransPirateBayCardI> = {
  default: {
    copy: 'Copy',
    size: 'Size',
    category: 'Category',
    date: 'Date',
    seeders: 'Seeders',
    leechers: 'Leechers',
    categories: {
      audio: 'Audio',
      video: 'Video',
      applications: 'App',
      games: 'Games',
      porn: 'Porn',
      other: 'Other',
    },
  },
  zh: {
    copy: '复制',
    size: '大小',
    category: '标签',
    date: '日期',
    seeders: '做种',
    leechers: '吸血',
    categories: {
      audio: '音频',
      video: '视频',
      applications: 'App',
      games: '游戏',
      porn: '色情',
      other: '其他',
    },
  },
}