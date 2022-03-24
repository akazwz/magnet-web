import {
  Box, Button,
  Flex, Hide,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement, Spacer, useColorMode,
  useColorModeValue
} from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon, HamburgerIcon, MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons'
import { SearchBar } from './SearchBar'

export const Header = () => {
  return (
    <SearchBar />
  )
}