import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Container, Grid, Text } from '@nextui-org/react'
import { useNfts } from '@/hooks/useNfts'
import Topbar from '@/components/Layout/Topbar'
import NftList from '@/components/List/NftList'
import constants from '@/configs/constants'
import Header from '@/components/Layout/Header'

const Home: NextPage = () => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const { data: nfts, getWalletNFTs } = useNfts()

  useEffect(() => {
    if (!isConnecting) {
      getWalletNFTs(address)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnecting])

  return (
    <div>
      <Header />
      <div>
        <Topbar />
        <Container css={{ pt: 120, textAlign: 'center' }}>
          <Text h1 size={60} css={{ mb: 0 }}>
            {constants.serviceName}
          </Text>
          <Text size={30} css={{ pb: 48 }}>
            ERC-6551
          </Text>
          {isDisconnected && (
            <Grid xs={12}>
              <Text size={18}>Connect your wallet.</Text>
            </Grid>
          )}
          <NftList nfts={nfts} />
        </Container>
      </div>
    </div>
  )
}

export default Home
