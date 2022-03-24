import {
  Box,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface ProviderPropsI {
  name: string
  provider: string
  logo: string
}

const ProviderList: Array<ProviderPropsI> = [
  { name: 'Pirate Bay', provider: 'pirate-bay', logo: '' },
  { name: 'Bit Search', provider: 'bit-search', logo: '' },
  { name: 'Nyaa SI', provider: 'nyaa-si', logo: '' },
  { name: 'EZTV', provider: 'eztv', logo: '' },
  { name: 'Torrent Galaxy', provider: 'torrent-galaxy', logo: '' },
]

export const Providers = () => {
  const router = useRouter()
  const { query, page, provider } = router.query
  const bg = useColorModeValue('blue.200', 'rgba(132,133,141,0.24)')
  const hoverBg = useColorModeValue('blue.100', 'rgba(132,133,141,0.12)')

  const handleProviderClick = (prov: string) => {
    /* 更换 url */
    router.replace({
      pathname: '/search/[query]',
      query: { query: query, provider: prov, page: page },
    }).then()
  }

  const list = ProviderList.map((prov) => (
    <Flex
      key={prov.provider}
      w='216px'
      alignItems='center'
      h='44px'
      p='12px'
      mx='12px'
      mb='5px'
      borderRadius='lg'
      role='group'
      cursor='pointer'
      bg={prov.provider === provider ? bg : 'transparent'}
      _hover={{
        bg: hoverBg,
      }}
      onClick={() => handleProviderClick(prov.provider)}
    >
      <Text fontSize='14px'>
        {prov.name}
      </Text>
    </Flex>
  ))
  return <Box>{list}</Box>
}