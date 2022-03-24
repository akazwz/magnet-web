import { TransPirateBayCard } from './constants'
import { TransPirateBayCardI } from './types'

export default {
  pirateBay: {
    fetch: async (locale: string): Promise<TransPirateBayCardI> =>
      TransPirateBayCard[locale] || TransPirateBayCard['default']
  }
}