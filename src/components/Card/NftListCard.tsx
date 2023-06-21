import { useRouter } from 'next/router'
import { Card, Text } from '@nextui-org/react'
import type { Nft } from '@/types'

type NftListCardProps = {
  nft: Nft
}

const NftListCard = (props: NftListCardProps) => {
  const { nft } = props

  const router = useRouter()

  return (
    <Card isPressable isHoverable onClick={() => router.push(`assets/${nft.tokenAddress}/${nft.tokenId}`)}>
      <Card.Image src={nft.imageUrl} height={350} width={350} />
      <Card.Body>
        <Text>{`${nft.name} # ${nft.tokenId}`}</Text>
      </Card.Body>
    </Card>
  )
}

export default NftListCard
