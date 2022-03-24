import { useEffect, useState } from 'react'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { SearchResultList } from '../../components/search/SearchResultList'
import { Torrent } from '../../src/torrent'
import { getMagnetsByApi } from '../../src/api/api'
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
  const { query, provider, page } = router.query
  const [torrents, setTorrents] = useState<Torrent[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!router.isReady) return
    if (typeof query !== 'string' || typeof provider !== 'string' || typeof page !== 'string') return
    if (Number(page) < 1) return
    setIsLoading(true)

    const handleGetMagnets = () => {
      getMagnetsByApi(query, provider, Number(page)).then((res) => {
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
    handleGetMagnets()
  }, [page, provider, query, router.isReady])

  if (isLoading) {
    return <Layout><Loading /></Layout>
  }

  if (torrents.length < 1) {
    return <Layout><EmptyResult /></Layout>
  }

  return (
    <Layout>
      <Box maxWidth='5xl' mx='auto'>
        <SearchResultList data={torrents} trans={transCard} />
      </Box>
    </Layout>
  )
}

export default Query
