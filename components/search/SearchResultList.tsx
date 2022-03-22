import { Heading, VStack, Flex, HStack, Center, Text, Spinner, Link, Box } from '@chakra-ui/react'
import { Torrent } from '../../src/torrent'

export type TorrentList = {
  data: Torrent[],
  isLoading: boolean,
}

export type TorrentListItem = {
  item: Torrent
}

const TorrentItem = ({ item }: TorrentListItem) => {
  return (
    <Box borderWidth={2} borderStyle="dashed" rounded="lg">
      <Text>{item.Name}</Text>
      <HStack>
        <Link href={item.Magnet}>magnet</Link>
        <Text>size:{item.Size}</Text>
        <Text>category:{item.Category}</Text>
        <Text>date:{item.DateUploaded}</Text>
      </HStack>
    </Box>
  )
}

export const SearchResultList = ({ data, isLoading }: TorrentList) => {
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
    <Flex
      flexDir='column'
      rounded='lg'
    >
      {data.map((item) => (
        <VStack
          key={item.Magnet}
          padding={1}
        >
          <TorrentItem item={item} />
        </VStack>
      ))}
    </Flex>
  )
}
