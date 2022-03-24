import {
  Box,
  Flex,
  Text,
  Spacer,
  HStack,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react'
import { TriangleUpIcon } from '@chakra-ui/icons'
import { Providers } from './Providers'
import UserProfileSideBar from './UserProfileSideBar'
import { useRouter } from 'next/router'

const SidebarTop = () => {
  const router = useRouter()
  return (
    <Flex
      alignItems='center'
      mx='24px'
      pt='36px'
      pb='36px'
      justifyContent='space-between'
    >
      <HStack
        spacing={3}
        h='24px'
        onClick={() => router.push('/', '/', { locale: router.locale })}
        _hover={{ cursor: 'pointer' }}
      >
        <TriangleUpIcon color={'yellow'} />
        <Text
          bgGradient='linear(to-r,  #FF0080, #00B0FF)'
          bgClip='text'
          fontSize='21px'
          fontWeight='extrabold'
          whiteSpace='nowrap'
        >
          Magnet Web
        </Text>
      </HStack>
    </Flex>
  )
}

export const SidebarContent = ({ isOpen }: SideBarI) => {
  return (
    <Box
      w={isOpen ? '240px' : 0}
      transition={'width .66s cubic-bezier(0.66, 0, 0.01, 1)'}
      willChange='width'
      bg={useColorModeValue('white', 'rgb(34, 34, 38)')}
      pos='fixed'
      h='full'
      overflow='scroll'
      css={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Flex
        direction='column'
        h='full'
      >
        <SidebarTop />
        <Providers />
        <Spacer />
        <Divider />
        <UserProfileSideBar />
      </Flex>
    </Box>
  )
}

interface SideBarI {
  isOpen: boolean
}

export const SideBar = ({ isOpen }: SideBarI) => {
  return (
    <>
      <Box
        w={isOpen ? '240px' : 0}
        bg={useColorModeValue('', 'rgb(34, 34, 38)')}
        flex='none'
        position='relative'
        height='100%'
        transition={'width .66s cubic-bezier(0.66, 0, 0.01, 1)'}
        willChange='width'
        overflow='hidden'
      >
        <SidebarContent isOpen={isOpen} />
      </Box>
    </>
  )
}