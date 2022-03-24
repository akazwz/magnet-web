import { ChangeEvent, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Button, Flex, Heading, HStack, Input, } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const Home: NextPage = () => {
  const router = useRouter()
  const [query, setQuery] = useState<string>('')
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const handleSearchBtnClick = () => {
    if (query.length < 1) return
    setBtnLoading(true)
    router.push({
      pathname: '/search/[query]',
      query: { query: query, provider: 'pirate-bay', page: 1 },
    }).then()
  }
  return (
    <Flex
      flexDir='column'
      height='70vh'
      maxWidth={{ base: 'sm', md: 'md', lg: 'xl' }}
      mx='auto'
      alignItems='center'
      justifyContent='center'
      padding={3}
    >
      <Heading
        bgGradient='linear(to-r,  #FF0080, #00B0FF)'
        bgClip='text'
        fontWeight='extrabold'
        whiteSpace='nowrap'
        margin={10}
      >
        Magnet Web
      </Heading>
      <HStack spacing={0}>
        <Input
          roundedRight='none'
          borderWidth={2}
          size='lg'
          placeholder={'keyword'}
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        />
        <Button
          roundedLeft={'none'}
          colorScheme='twitter'
          leftIcon={<SearchIcon />}
          size='lg'
          isLoading={btnLoading}
          onClick={handleSearchBtnClick}
        >
          Search
        </Button>
      </HStack>
    </Flex>
  )
}

export default Home
