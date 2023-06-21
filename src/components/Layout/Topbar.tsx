import { useRouter } from 'next/router'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Navbar, Text } from '@nextui-org/react'
import constants from '@/configs/constants'

const Topbar = () => {
  const router = useRouter()

  return (
    <Navbar isBordered variant="floating">
      <Navbar.Brand onClick={() => router.push('/')}>
        <Text b color="inherit" hideIn="xs">
          {constants.serviceName}
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        <ConnectButton />
      </Navbar.Content>
    </Navbar>
  )
}

export default Topbar
