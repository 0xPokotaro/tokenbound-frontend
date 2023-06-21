import { useEffect, useState } from 'react'
import Moralis from 'moralis'
import { EvmChain } from '@moralisweb3/common-evm-utils'
import { useContractRead } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import RegistryABI from '@/abis/RegistryABI.json'
import constants from '@/configs/constants'
import { Card, Grid, Text } from '@nextui-org/react'

const TokenList = (props: any) => {
  const { implementationAddress, tokenAddress, tokenId, salt } = props

  const [nftList, setNftList] = useState([])

  const { data: tokenBoundAccount } = useContractRead({
    address: constants.registryContractAddress,
    abi: RegistryABI,
    functionName: 'account',
    args: [implementationAddress, sepolia.id, tokenAddress, tokenId, salt],
  })

  const handleGetWalletNFTs = async () => {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
      })
    }

    const chain = EvmChain.SEPOLIA

    if (!tokenBoundAccount) {
      return
    }

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address: tokenBoundAccount.toString(),
      chain,
    })

    const json: any = response.toJSON()
    console.log('tba nfts: ', json)

    setNftList(json.result || [])
  }

  useEffect(() => {
    if (!tokenBoundAccount) return
    handleGetWalletNFTs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenBoundAccount])

  return (
    <>
      {nftList.length > 0 && (
        <Grid.Container>
          {nftList.map((nft: any, index: number) => {
            return (
              <Grid xs={4} key={index}>
                <Card isHoverable>
                  <Card.Image src="https://i.seadn.io/gcs/files/444f8fe92a9ade02eb90d992e924b8dd.png?auto=format&dpr=1&w=1000" />
                  <Card.Body>
                    <Text>{`${nft.name} # ${nft.token_id}`}</Text>
                  </Card.Body>
                </Card>
              </Grid>
            )
          })}
        </Grid.Container>
      )}
    </>
  )
}

export default TokenList
