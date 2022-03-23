import { HStack, IconButton, Square } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

export const Pagination = () => {
  return (
    <HStack>
      <Square>
        <IconButton aria-label={'last page'} icon={<ChevronLeftIcon />} />
      </Square>

      <Square>
        <IconButton aria-label={'next page'} icon={<ChevronRightIcon />} />
      </Square>
    </HStack>
  )
}
