export interface TransPirateBayCardI {
  copy: string
  size: string
  category: string
  date: string
  seeders: string
  leechers: string
  categories: {
    audio: string
    video: string
    applications: string
    games: string
    porn: string
    other: string
  }
}