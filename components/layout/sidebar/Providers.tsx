import {
  Box,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'

interface ProviderPropsI {
  name: string
  logo: string
}

const ProviderList: Array<ProviderPropsI> = [
  { name: 'Pirate Bay', logo: '' },
  { name: 'Bit Search', logo: '' },
  { name: 'Nyaa SI', logo: '' },
  { name: 'EZTV', logo: '' },
  { name: 'Torrent Galaxy', logo: '' },
  { name: 'Zooqle', logo: '' },
]

interface ProviderI {
  name: string
  currentProvider: string
}

const Provider = ({ name, currentProvider }: ProviderI) => {
  const bg = useColorModeValue('blue.200', 'rgba(132,133,141,0.24)')
  return (
    <Flex
      w='216px'
      alignItems='center'
      h='44px'
      p='12px'
      mx='12px'
      mb="5px"
      borderRadius='lg'
      role='group'
      cursor='pointer'
      bg={name === currentProvider ? bg : 'transparent'}
      _hover={{
        bg: useColorModeValue('blue.100', 'rgba(132,133,141,0.12)'),
      }}
    >
      <Text fontSize='14px'>
        {name}
      </Text>
    </Flex>
  )
}

export const Providers = () => {
  const list = ProviderList.map((provider) => (
    <Provider
      key={provider.name}
      name={provider.name}
      currentProvider={'Pirate Bay'}
    />
  ))
  return <Box>{list}</Box>
}