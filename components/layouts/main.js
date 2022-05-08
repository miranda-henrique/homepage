import Head from 'next/head'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Henrique's homepage" />
        <meta name="author" content="Henrique Miranda" />
        <link rel="icon" href="/favicon_v2.png" type="image/x-icon" />
        <meta name="twitter:title" content="Henrique Miranda" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@henriquemiranda" />
        <meta name="twitter:creator" content="@henriquemiranda" />
        <meta property="og:site_name" content="Henrique Miranda" />
        <meta name="og:title" content="Henrique Miranda" />
        <meta property="og:type" content="website" />
        <title>Henrique Miranda - Homepage</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        {children}

        <Footer />
      </Container>
    </Box>
  )
}

export default Main
