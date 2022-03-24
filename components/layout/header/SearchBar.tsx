import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box, Button,
  HStack,
  IconButton,
  Input,
  useColorModeValue
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export const SearchBar = () => {
  const bg = useColorModeValue('gray.100', 'rgb(17, 17, 19)')
  const router = useRouter()
  const { query } = router.query
  const [queryState, setQueryState] = useState<string>('')
  const [btnLoading, setBtnLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!router.isReady) return
    if (typeof query === 'string') {
      setQueryState(query)
    }
  }, [query, router.isReady])

  const handleSearchBtnClick = () => {
    setBtnLoading(true)
    /* 搜索关键词不变，刷新页面 */
    if (query === queryState) {
      router.reload()
      return
    }
    /* 更换 url */
    router.replace({
      pathname: '/search/[query]',
      query: { query: queryState, page: 1 },
    }).then(() => {
      setBtnLoading(false)
    })
  }

  return (
    <HStack
      paddingTop={'10px'}
      paddingBottom={'10px'}
      spacing={0}
      position='sticky'
      top='0'
      zIndex='3'
      bg={bg}
      w='100%'
      alignItems='center'
      justifyContent='center'
    >
      <Input
        roundedRight='none'
        borderWidth={1}
        value={queryState}
        width={{ base: 'sm', md: 'md', lg: 'xl' }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQueryState(e.target.value)}
      />
      <Box display={{ base: 'none', md: 'flex' }}>
        <Button
          roundedLeft={'none'}
          colorScheme='twitter'
          leftIcon={<SearchIcon />}
          isLoading={btnLoading}
          onClick={handleSearchBtnClick}
        >
          Search
        </Button>
      </Box>
      <Box display={{ base: 'flex', md: 'none' }}>
        <IconButton
          aria-label={'search'}
          roundedLeft={'none'}
          colorScheme='twitter'
          icon={<SearchIcon />}
          isLoading={btnLoading}
          onClick={handleSearchBtnClick}
        />
      </Box>
    </HStack>
  )
}
