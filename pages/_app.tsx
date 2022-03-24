import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  const config: ThemeConfig = {
    useSystemColorMode: false,
  }

  const chakraTheme = extendTheme({ config })
  return (
    <RecoilRoot>
      <ChakraProvider theme={chakraTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default MyApp
