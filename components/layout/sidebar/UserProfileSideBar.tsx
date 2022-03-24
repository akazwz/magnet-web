import {
  Text,
  Spacer,
  Avatar,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'

const UserProfileSideBar = () => {
  return (
    <HStack
      p='24px'
      spacing='16px'
      h='75px'
      _hover={{ backgroundColor: useColorModeValue('blue.100', 'rgba(132,133,141,0.12)') }}
    >
      <Avatar
        size='sm'
        src={'https://ccp-bj29-bj-1592982087.oss-cn-beijing.aliyuncs.com/pds%2Favatar%2F37ef763b41ba4a6d850520eeef93c103?x-oss-access-key-id=LTAIsE5mAn2F493Q&x-oss-expires=1646712513&x-oss-signature=0QQ2UCEQ8DXn0QBq1U7Pqbsvkb9j87JnXBTmYQKPA2s%3D&x-oss-signature-version=OSS2'}
      />
      <Text>akazwz</Text>
      <Spacer />
    </HStack>
  )
}

export default UserProfileSideBar