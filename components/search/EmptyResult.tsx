import { Flex, Heading, Image } from '@chakra-ui/react'

export const EmptyResult = () => {
  return (
    <Flex flexDir='column' alignItems='center' justify='center' height='80vh'>
      <Heading>Empty</Heading>
      <Image alt={'empty'} src={'/empty.svg'} w='xl' />
    </Flex>
  )
}