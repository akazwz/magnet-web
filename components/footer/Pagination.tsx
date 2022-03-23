import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Square,
  VStack,
  Button,
  HStack,
  Spinner,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

type PaginationType = {
  query: string
  page: number
}

export const Pagination = ({ query, page }: PaginationType) => {
  const router = useRouter()

  const [pageInputValue, setPageInputValue] = useState<number>()

  let pages = []

  /* 页数大于 5 */
  if (page > 5) {
    for (let i = page - 2; i <= page; i++) {
      pages.push(
        <Square key={'pages' + i} color={page === i ? 'blue.500' : ''}>
          <Button onClick={() => handlePagesClick(i)}>
            {i}
          </Button>
        </Square>
      )
    }
    for (let i = page + 1; i <= page + 2; i++) {
      pages.push(
        <Square key={'pages' + i} color={page === i ? 'blue.500' : ''}>
          <Button onClick={() => handlePagesClick(i)}>
            {i}
          </Button>
        </Square>
      )
    }
  } else {
    /* 页数小于 5 */
    for (let i = 1; i <= 5; i++) {
      pages.push(
        <Square key={'pages' + i} color={page === i ? 'blue.500' : ''}>
          <Button onClick={() => handlePagesClick(i)}>
            {i}
          </Button>
        </Square>
      )
    }
  }

  /* 页数跳转 */
  const handlePagesClick = (page: number) => {
    router.replace({
      pathname: '/search/[query]',
      query: { query: query, page: page },
    }).then()
  }

  /* 下一页 */
  const handleNextPageClick = () => {
    router.replace({
      pathname: '/search/[query]',
      query: { query: query, page: page + 1 },
    }).then()
  }

  /* 上一页 */
  const handleLastPageClick = () => {
    router.replace({
      pathname: '/search/[query]',
      query: { query: query, page: page - 1 },
    }).then()
  }

  /* 自定义页数跳转 */
  const handleGoToPages = () => {
    router.replace({
      pathname: '/search/[query]',
      query: { query: query, page: pageInputValue },
    }).then()
  }

  /* 更新页数输入值 */
  useEffect(() => {
    setPageInputValue(page)
  }, [page])

  return (
    <VStack>
      <HStack>
        <Square>
          <IconButton
            aria-label={'last page'}
            icon={<ChevronLeftIcon />}
            isDisabled={page === 1}
            onClick={handleLastPageClick}
          />
        </Square>
        {pages}
        <Square>
          <IconButton
            aria-label={'next page'}
            icon={<ChevronRightIcon />}
            onClick={handleNextPageClick}
          />
        </Square>
      </HStack>

      <HStack>
        <NumberInput
          min={1}
          maxW={32}
          value={pageInputValue}
          onChange={(value) => setPageInputValue(Number(value))}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button colorScheme='twitter' isDisabled={!pageInputValue} onClick={handleGoToPages}>
          GO
        </Button>
      </HStack>
    </VStack>
  )
}
