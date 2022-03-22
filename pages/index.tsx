import type { NextPage } from 'next'
import { Flex, Heading, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { ChangeEvent, useState } from 'react'

const Home: NextPage = () => {
  const [query, setQuery] = useState<string>('')
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const handleSearchBtnClick = () => {
    setBtnLoading(true)
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
      <Heading margin={10}>Torrent Search</Heading>
      <InputGroup size='lg'>
        <Input
          rounded='lg'
          borderWidth={2}
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
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
            size='lg'
            icon={<SearchIcon />}
            isLoading={btnLoading}
            onClick={handleSearchBtnClick}
          />
        </InputRightElement>
      </InputGroup>
    </Flex>
  )
}

export default Home
