import { useEffect, useState } from 'react'
import Moralis from 'moralis'
import { EvmChain } from '@moralisweb3/common-evm-utils'
import type { Nfts } from '@/types'

export const useNfts = () => {
  const [data, setData] = useState<Nfts>([])
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

  const getWalletNFTs = async (address: `0x${string}` | undefined): Promise<void> => {
    setLoading(true)
    setData([])

    if (!address) {
      setData([])
      setLoading(false)
      return
    }

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain: EvmChain.SEPOLIA,
    })

    const json = response.toJSON()

    if (json.result) {
      const nfts: Nfts = []
      for (const nft of json.result) {
        nfts.push({
          tokenAddress: nft.token_address,
          tokenId: nft.token_id,
          name: nft.name,
          symbol: nft.symbol,
          imageUrl: '/assets/images/question.png',
        })
      }

      setData(nfts)
    }

    setLoading(false)
  }

  return { data, loading, getWalletNFTs }
}
