import {
  Box,
  Text,
  Link,
  Stack,
  Center,
  Spinner,
  Heading,
  WrapItem,
  Container, Divider, Grid, SimpleGrid,
} from '@chakra-ui/react'
import dayjs, { Dayjs } from 'dayjs'
import { Torrent } from '../../src/torrent'

export type TorrentList = {
  data: Torrent[],
  isLoading: boolean,
}

export type TorrentListItem = {
  item: Torrent
}

const TorrentItemCard = ({ item }: TorrentListItem) => {
  const now = new Date()
  /* 替换 html 空格 获取正确的日期格式 */
  const dateStr = item.DateUploaded?.replaceAll(' ', ' ')
  let date: Dayjs
  /* 今年,日期格式为 MM-DD HH:mm */
  if (dateStr?.indexOf(':') !== -1) {
    date = dayjs(now.getFullYear().toString() + '-' + dateStr, 'YYYY-MM-DD HH:mm')
  } else {
    date = dayjs(dateStr, 'MM-DD YYYY')
  }
  return (
    <Box
      borderWidth={2}
      borderStyle='dashed'
      rounded='lg'
      padding={2}
    >
      {/* 超出换行 */}
      <Text fontWeight='bold' wordBreak='break-all'>{item.Name}</Text>
      <Divider />
      <SimpleGrid minChildWidth='100px' spacing={3}>
        <Link href={item.Magnet}>magnet</Link>
        <Text>
          size:{item.Size}
        </Text>
        <Text>category:{item.Category}</Text>
        <Text>date:{date.format('YYYY-MM-DD')}</Text>
      </SimpleGrid>
    </Box>
  )
}

export const SearchResultListPirateBay = ({ data, isLoading }: TorrentList) => {
  /* 加载中 */
  if (isLoading) {
    return (
      <Center height='80vh'>
        <Spinner size='lg' />
      </Center>
    )
  }
  /* 数据为空 */
  if (data.length === 0) {
    return (
      <>
        <Heading>Empty</Heading>
      </>
    )
  }

  return (
    <Container maxWidth='5xl'>
      {data.map((item) => (
        <Container
          key={item.Magnet}
          maxWidth='5xl'
          padding={1}
        >
          <TorrentItemCard item={item} />
        </Container>
      ))}
    </Container>
  )
}
