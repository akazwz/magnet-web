import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Input,
  HStack,
  Button,
  IconButton,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export const SearchBar = () => {
  const router = useRouter()
  const { query, provider, page } = router.query
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
      query: { query: queryState, provider: provider, page: page },
    }).then(() => {
      setBtnLoading(false)
    })
  }

  return (
    <HStack
      paddingTop={'10px'}
      paddingBottom={'10px'}
      spacing={0}
      alignItems='center'
      justifyContent='center'
    >
      <Input
        roundedRight='none'
        borderWidth={1}
        value={queryState}
        width={{ base: 'xxs', md: 'md', lg: 'xl' }}
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
