import { useRouter } from 'next/router'
import {
  Flex,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react'
import { SearchBar } from './SearchBar'
import { Pagination } from './Pagination'

export const Header = () => {
  const router = useRouter()
  const { query, page } = router.query
  const bg = useColorModeValue('white', 'rgb(17, 17, 19)')
  return (
    <Flex
      alignItems='center'
      flexDirection='column'
      position='sticky'
      top='0'
      zIndex='3'
      bg={bg}
      paddingBottom='10px'
    >
      <SearchBar />
      <Pagination page={Number(page)} query={query?.toString() || ''} />
      <Divider />
    </Flex>
  )
}

