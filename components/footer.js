import { Box } from '@chakra-ui/react'
import TakuyaLogo from './takuyaLogo'

const Footer = () => {
  return (
    <Box align="center" opacity={0.4} fontSize="sm" mt="auto">
      &copy; {new Date().getFullYear()} Based on <TakuyaLogo />
    </Box>
  )
}

export default Footer
