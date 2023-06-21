import { useEffect } from 'react'
import { useContractRead } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import RegistryABI from '@/abis/RegistryABI.json'
import constants from '@/configs/constants'
import { Button, Text } from '@nextui-org/react'

type TokenBoundAccountAddressProps = {
  implementationAddress: string
  tokenAddress: string | string[] | undefined
  tokenId: string | string[] | undefined
  salt: number
  setTbaAddress: (address: string) => void
}

const TokenBoundAccountAddress = (props: TokenBoundAccountAddressProps) => {
  const { implementationAddress, tokenAddress, tokenId, salt, setTbaAddress } = props

  const { data: tokenBoundAccount } = useContractRead({
    address: constants.registryContractAddress,
    abi: RegistryABI,
    functionName: 'account',
    args: [implementationAddress, sepolia.id, tokenAddress, tokenId, salt],
  })

  useEffect(() => {
    if (tokenBoundAccount) {
      setTbaAddress(tokenBoundAccount.toString())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenBoundAccount])

  return <>{tokenBoundAccount ? <Text>TBA: {tokenBoundAccount.toString()}</Text> : <Button>Create wallet</Button>}</>
}

export default TokenBoundAccountAddress
