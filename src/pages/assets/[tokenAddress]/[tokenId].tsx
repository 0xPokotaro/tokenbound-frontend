import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container, Card, Grid, Text } from '@nextui-org/react'
import TokenBoundAccountAddress from '@/components/TBA/TokenBoundAccountAddress'
import Topbar from '@/components/Layout/Topbar'
import constants from '@/configs/constants'
import { useNft } from '@/hooks/useNft'
import { useNfts } from '@/hooks/useNfts'
import { Nft } from '@/types'
import Header from '@/components/Layout/Header'

const salt = 0

const AssetPage = () => {
  const router = useRouter()

  const { data: nft, getNFTMetadata } = useNft()
  const { data: nfts, getWalletNFTs } = useNfts()

  const [tbaAddress, setTbaAddress] = useState<string>('')

  useEffect(() => {
    if (!router.query) return
    if (!router.query.tokenAddress) return
    if (!router.query.tokenId) return

    const tokenAddress = router.query.tokenAddress as string
    const tokenId = router.query.tokenId as string

    getNFTMetadata(tokenAddress, tokenId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    if (!tbaAddress) return

    getWalletNFTs(tbaAddress as `0x${string}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tbaAddress])

  return (
    <div>
      <Header />
      <div>
        <Topbar />
        <Container css={{ pt: 64 }}>
          <Grid.Container gap={2}>
            <Grid xs={5}>
              <Card>{nft && <Card.Image src={nft.imageUrl} height={720} width={720} />}</Card>
            </Grid>
            <Grid xs={7} direction="column">
              <Text h2 css={{ mb: 0 }}>
                {nft && nft.name} # {nft && nft.tokenId}
              </Text>
              <TokenBoundAccountAddress
                implementationAddress={constants.implementationContractAddress}
                tokenAddress={router.query.tokenAddress}
                tokenId={router.query.tokenId}
                salt={salt}
                setTbaAddress={setTbaAddress}
              />

              <Grid xs={12}>
                {nfts.length !== 0 &&
                  nfts.map((nft: Nft, index: number) => {
                    return (
                      <Grid key={index} xs={3} direction="column">
                        <Card isHoverable onClick={() => router.push(`assets/${nft.tokenAddress}/${nft.tokenId}`)}>
                          <Card.Image src={nft.imageUrl} height={300} width={300} />
                          <Card.Body>
                            <Text>{`${nft.name} # ${nft.tokenId}`}</Text>
                          </Card.Body>
                        </Card>
                      </Grid>
                    )
                  })}
              </Grid>
            </Grid>
          </Grid.Container>
        </Container>
        <Container css={{ pt: 64, mx: 80 }}></Container>
      </div>
    </div>
  )
}

export default AssetPage
