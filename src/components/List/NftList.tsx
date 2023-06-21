import { Grid, Text } from '@nextui-org/react'
import NftListCard from '@/components/Card/NftListCard'
import type { Nft, Nfts } from '@/types'

type NftListProps = {
  nfts: Nfts
}

const NftList = (props: NftListProps) => {
  const { nfts } = props

  return (
    <>
      {nfts.length === 0 ? (
        <Grid xs={12}>
          <Text size={18}>No NFTs found.</Text>
        </Grid>
      ) : (
        <Grid.Container gap={2} justify="center">
          {nfts.map((nft: Nft, index: number) => {
            return (
              <Grid xs={3} key={index}>
                <NftListCard nft={nft} />
              </Grid>
            )
          })}
        </Grid.Container>
      )}
    </>
  )
}

export default NftList
