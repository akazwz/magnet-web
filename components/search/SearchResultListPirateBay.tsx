import { useEffect } from 'react'
import {
  Box,
  Text,
  Link,
  Button,
  HStack,
  Divider,
  Container,
  SimpleGrid,
  useClipboard,
  useToast,
} from '@chakra-ui/react'
import dayjs, { Dayjs } from 'dayjs'
import { CopyIcon } from '@chakra-ui/icons'
import { Torrent } from '../../src/torrent'

export type TorrentList = {
  data: Torrent[],
}

export type TorrentListItem = {
  item: Torrent
}

const TorrentItemCard = ({ item }: TorrentListItem) => {
  /* 替换 html 空格 获取正确的日期格式 */
  const dateStr = item.DateUploaded?.replaceAll(' ', ' ').replaceAll('-', '/')

  let date: Dayjs
  /* 今年,日期格式为 MM-DD HH:mm */
  if (dateStr?.indexOf(':') !== -1) {
    date = dayjs(dayjs().year() + '/' + dateStr, 'YYYY/MM/DD HH:mm')
    /* Y-day */
    if (!date.isValid()) {
      date = dayjs().add(-1, 'day')
    }
  } else {
    date = dayjs(dayjs(dateStr), 'MM/DD YYYY')
  }

  const { hasCopied, onCopy } = useClipboard(item.Magnet)

  const toast = useToast()

  useEffect(() => {
    if (!hasCopied) return
    toast({
      title: 'Copy Magnet Success',
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
      <Link href={item.Magnet} fontWeight='bold' wordBreak='break-all'>{item.Name}</Link>
      <Divider />
      <SimpleGrid minChildWidth='120px' spacing={3} fontSize='sm' fontWeight='light' paddingTop={1}>
        <HStack>
          <Button
            aria-label={'copy'}
            rightIcon={<CopyIcon fontSize='lg' />}
            variant='outline'
            size='sm'
            colorScheme='twitter'
            rounded='sm'
            onClick={onCopy}
          >
            Copy
          </Button>
        </HStack>
        <HStack>
          <Text>size:</Text>
          <Text fontWeight='semibold'>{item.Size}</Text>
        </HStack>
        <HStack>
          <Text>category:</Text>
          <Text fontWeight='semibold'>{item.Category}</Text>
        </HStack>
        <HStack>
          <Text>date:</Text>
          <Text fontWeight='semibold'>{date.format('YYYY-MM-DD')}</Text>
        </HStack>
        <HStack>
          <Text>seeders:</Text>
          <Text fontWeight='semibold'>{item.Seeders}</Text>
        </HStack>
        <HStack>
          <Text>leechers:</Text>
          <Text fontWeight='semibold'>{item.Leechers}</Text>
        </HStack>
      </SimpleGrid>
    </Box>
  )
}

export const SearchResultListPirateBay = ({ data }: TorrentList) => {
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
