import Head from 'next/head'
import constants from '@/configs/constants'

const Header = () => {
  return (
    <Head>
      <title>{constants.serviceName}</title>
      <meta content="Generated by @rainbow-me/create-rainbowkit" name="description" />
      <link href="/favicon.ico" rel="icon" />
    </Head>
  )
}

export default Header
