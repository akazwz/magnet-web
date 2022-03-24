import { useEffect, useState } from 'react'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/react'
import { SearchBar } from '../../components/layout/header/SearchBar'
import { SearchResultListPirateBay } from '../../components/search/SearchResultListPirateBay'
import { Torrent } from '../../src/torrent'
import { getPirateBay } from '../../src/api/api'
import { Pagination } from '../../components/footer/Pagination'
import { Loading } from '../../components/search/Loading'
import { EmptyResult } from '../../components/search/EmptyResult'
import trans from '../../src/trans'
import { TransPirateBayCardI } from '../../src/types'
import { Layout } from '../../components/layout'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps = async (ctx: { locale: string }) => {
  const { locale } = ctx
  const transCard = await trans.pirateBay.fetch(locale)
  return {
    props: {
      transCard,
    }
  }
}

const Query: (props: { transCard: TransPirateBayCardI }) => JSX.Element = (props: { transCard: TransPirateBayCardI }) => {
  const { transCard } = props
  const router = useRouter()
  const { query, page } = router.query
  const [torrents, setTorrents] = useState<Torrent[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!router.isReady) return
    if (typeof query === 'string' && typeof page === 'string') {
      setIsLoading(true)
      /* page小于 1为非法 */
      if (Number(page) < 1) return
      getPirateBay(query, Number(page)).then((res) => {
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
  }, [page, query, router.isReady])

  return (
    <Layout>
      <Box maxWidth='5xl' mx='auto'>
        {/* 加载中 ? 加载页面 : 结果不为空 ? 结果 ： 空页面 */}
        {
          isLoading
            ? <Loading />
            : torrents.length > 1
              ? <SearchResultListPirateBay data={torrents} trans={transCard} />
              : <EmptyResult />
        }
        {/* 分页 */}
        {
          isLoading
            ? null
            : torrents.length > 1
              ? <Pagination page={Number(page)} query={query?.toString() || ''} />
              : null
        }
      </Box>
    </Layout>
  )
}

export default Query
