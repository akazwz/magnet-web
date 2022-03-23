import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Flex } from '@chakra-ui/react'
import { SearchBar } from '../../components/header/SearchBar'
import { SearchResultListPirateBay } from '../../components/search/SearchResultListPirateBay'
import { Torrent } from '../../src/torrent'
import { getPirateBay } from '../../src/api/api'
import { Pagination } from '../../components/footer/Pagination'

const Query: NextPage = () => {
  const router = useRouter()
  const { query } = router.query
  const [torrents, setTorrents] = useState<Torrent[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!router.isReady) return
    if (typeof query === 'string') {
      setIsLoading(true)
      getPirateBay(query).then((res) => {
        res.json().then((resData) => {
          setIsLoading(false)
          const { data } = resData
          if (!data) return
          setTorrents(data)
        })
      }).catch((e: unknown) => {
        console.log(e)
        setIsLoading(false)
        alert('获取数据失败')
      })
    }
  }, [query, router.isReady])

  return (
    <Flex
      flexDir='column'
      mx='auto'
      alignItems='center'
      padding={3}
    >
      <SearchBar />
      <SearchResultListPirateBay data={torrents} isLoading={isLoading} />
      <Pagination />
    </Flex>
  )
}

export default Query
