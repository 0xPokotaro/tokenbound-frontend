import { useEffect, useState } from 'react'
import Moralis from 'moralis'
import { EvmChain } from '@moralisweb3/common-evm-utils'
import type { Nft } from '@/types'

export const useNft = () => {
  const [data, setData] = useState<Nft>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      if (!Moralis.Core.isStarted) {
        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        })
      }
    })()
  }, [])

  const getNFTMetadata = async (tokenAddress: string, tokenId: string): Promise<void> => {
    setLoading(true)
    setData({} as Nft)

    if (!tokenAddress || !tokenId) {
      setData({} as Nft)
      setLoading(false)
      return
    }

    const response = await Moralis.EvmApi.nft.getNFTMetadata({
      address: tokenAddress as string,
      tokenId: tokenId,
      chain: EvmChain.SEPOLIA,
    })

    if (!response) {
      setData({} as Nft)
      setLoading(false)
      return
    }

    const json = response.toJSON()

    if (!json) {
      setData({} as Nft)
      setLoading(false)
      return
    }

    setData({
      tokenAddress: json.token_address,
      tokenId: json.token_id,
      name: json.name,
      symbol: json.symbol,
      imageUrl: '/assets/images/question.png',
    })

    setLoading(false)
  }

  return { data, loading, getNFTMetadata }
}
