import { useEffect } from 'react'

import {
  Box,
  Text,
  Link,
  Center,
  HStack,
  Spinner,
  Heading,
  Divider,
  Container,
  IconButton,
  SimpleGrid,
  useClipboard,
  useToast,
} from '@chakra-ui/react'
import dayjs, { Dayjs } from 'dayjs'
import { CopyIcon } from '@chakra-ui/icons'
import { Torrent } from '../../src/torrent'

export type TorrentList = {
  data: Torrent[],
  isLoading: boolean,
}

export type TorrentListItem = {
  item: Torrent
}

const TorrentItemCard = ({ item }: TorrentListItem) => {
  /* 替换 html 空格 获取正确的日期格式 */
  const dateStr = item.DateUploaded?.replaceAll(' ', ' ')

  let date: Dayjs
  /* 今年,日期格式为 MM-DD HH:mm */
  if (dateStr?.indexOf(':') !== -1) {
    date = dayjs(dayjs().year() + '-' + dateStr, 'YYYY-MM-DD HH:mm')
  } else {
    alert(dateStr)
    date = dayjs(dateStr, 'MM-DD YYYY')
  }

  const { hasCopied, onCopy } = useClipboard(item.Magnet)

  const toast = useToast()

  useEffect(() => {
    if (!hasCopied) return
    toast({
      title: '复制成功',
      position: 'top',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }, [hasCopied, toast])

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
      <SimpleGrid minChildWidth='120px' spacing={3} fontSize='sm' fontWeight='light'>
        <HStack>
          <Link href={item.Magnet}>magnet</Link>
          <IconButton
            aria-label={'copy'}
            icon={<CopyIcon fontSize='lg' />}
            variant='ghost'
            size='sm'
            onClick={onCopy}
          />
        </HStack>
        <HStack>
          <Text>
            size:{item.Size}
          </Text>
        </HStack>
        <HStack>
          <Text>category:{item.Category}</Text>
        </HStack>
        <HStack>
          <Text>date:{date.format('YYYY-MM-DD')}</Text>
        </HStack>
        <HStack>
          <Text>seeders:{item.Seeders}</Text>
        </HStack>
        <HStack>
          <Text>leechers:{item.Leechers}</Text>
        </HStack>
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
          padding={2}
        >
          <TorrentItemCard item={item} />
        </Container>
      ))}
    </Container>
  )
}
