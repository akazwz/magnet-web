import { ReactNode } from 'react'
import {
  Box,
  Flex, HStack, IconButton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { SideBar } from './sidebar'
import { Header } from './header'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

interface IProps {
  children: ReactNode
}

export const Layout = ({ children }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false })
  const bg = useColorModeValue('gray.100', 'rgb(17, 17, 19)')

  return (
    /* body */
    <Flex
      h='100vh'
      w='100vw'
      position={'fixed'}
      bg={bg}
    >
      {/* 侧边栏 */}
      <SideBar isOpen={isOpen} />
      {/* 侧边栏开关 */}
      <HStack paddingTop={3}>
        <IconButton
          aria-label={isOpen ? 'close' : 'open'}
          icon={isOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
          variant='ghost'
          opacity={0.5}
          size='xs'
          rounded='none'
          onClick={isOpen ? onClose : onOpen}
        />
      </HStack>
      {/* header and main */}
      <Box
        h='full'
        w='100%'
        paddingRight='24px'
        paddingBottom='12px'
        overflowY='scroll'
        css={{
          '&::-webkit-scrollbar': {},
        }}
      >
        <Header />
        {children}
      </Box>
    </Flex>
  )
}