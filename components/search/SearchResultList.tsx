import { useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Text,
  Link,
  Button,
  HStack,
  Divider,
  SimpleGrid,
  useClipboard,
  useToast,
} from '@chakra-ui/react'
import dayjs, { Dayjs } from 'dayjs'
import { CopyIcon } from '@chakra-ui/icons'
import { Torrent } from '../../src/torrent'
import { TransPirateBayCardI } from '../../src/types'

export type TorrentList = {
  data: Torrent[],
  trans: TransPirateBayCardI
}

export type TorrentListItem = {
  item: Torrent
  trans: TransPirateBayCardI
}

const TorrentItemCard = ({ item, trans }: TorrentListItem) => {
  const { provider } = useRouter().query

  /* 替换 html 空格 获取正确的日期格式 */
  const dateStr = item.DateUploaded?.replaceAll(' ', ' ').replaceAll('-', '/')

  let date: Dayjs
  let showDate: string
  /* 今年,日期格式为 MM-DD HH:mm */
  if (dateStr?.indexOf(':') !== -1 && provider === 'pirate-bay') {
    date = dayjs(dayjs().year() + '/' + dateStr, 'YYYY/MM/DD HH:mm')
    /* Y-day */
    if (!date.isValid()) {
      date = dayjs().add(-1, 'day')
    }
  } else {
    date = dayjs(dayjs(dateStr), 'MM/DD YYYY')
  }

  switch (provider) {
    case 'nyaa-si':
      date = dayjs(dateStr, 'YYYY/MM/DD HH:mm')
      break
    case 'eztv':
      date = dayjs().add(-Number(dateStr?.split(' ')[0]), dateStr?.split(' ')[1])
      break
  }

  if (date.isValid()) {
    showDate = date.format('YYYY-MM-DD')
  } else {
    showDate = dateStr || ''
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
      <Link
        title={item.Name}
        href={item.Magnet}
        fontWeight='bold'
        wordBreak='break-all'
      >
        {item.Name}
      </Link>
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
            {trans.copy}
          </Button>
        </HStack>
        <HStack>
          <Text>size:</Text>
          <Text fontWeight='semibold'>{item.Size}</Text>
        </HStack>
        {
          provider === 'pirate-bay' || provider === 'nyaa-si'
            ?
            <HStack>
              <Text>category:</Text>
              <Text fontWeight='semibold'>{item.Category}</Text>
            </HStack>
            : null
        }
        <HStack>
          <Text>date:</Text>
          <Text fontWeight='semibold'>{showDate}</Text>
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

export const SearchResultList = ({ data, trans }: TorrentList) => {
  return (
    <Box>
      {data.map((item) => (
        <Box
          key={item.Magnet}
          mt={2}
          mb={2}
        >
          <TorrentItemCard item={item} trans={trans} />
        </Box>
      ))}
    </Box>
  )
}
