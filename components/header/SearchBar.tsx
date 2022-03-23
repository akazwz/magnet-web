import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Flex, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export const SearchBar = () => {
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
    <Flex margin={3}>
      <InputGroup>
        <Input
          rounded='lg'
          borderWidth={1}
          value={queryState}
          width={{ base: 'sm', md: 'md', lg: 'xl' }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQueryState(e.target.value)}
        />
        <InputRightElement>
          <IconButton
            aria-label={'search'}
            backgroundColor='blue.500'
            _hover={{
              backgroundColor: 'blue.600'
            }}
            _focusWithin={{
              backgroundColor: 'blue.600'
            }}
            icon={<SearchIcon />}
            isLoading={btnLoading}
            onClick={handleSearchBtnClick}
          />
        </InputRightElement>
      </InputGroup>
    </Flex>
  )
}
