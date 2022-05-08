import NextLink from 'next/link'
import {
  Container,
  Heading,
  Box,
  Button,
  SimpleGrid,
  useColorModeValue,
  chakra
} from '@chakra-ui/react'
import Paragraph from '../components/paragraph'
import { StackSection, StackTitle, StackContent } from '../components/bio'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { GridItem } from '../components/grid-item'
import thumbMern from '../public/images/works/mern.jpeg'
import thumbNextTs from '../public/images/works/nextTs.png'
import thumbNodeTsEx from '../public/images/works/nodeTsEx.png'
import thumbReactTs from '../public/images/works/reactTs.png'
import thumbFi from '../public/images/works/fi.png'
import thumbFiBlog from '../public/images/works/fi-blog.png'
import Image from 'next/image'

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Home = () => (
  <Layout>
    <Container>
      <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        css={{ backdropFilter: 'blur(10px)' }}
      ></Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Henrique Miranda
          </Heading>
          <p>
            Software Developer <br />( Javascript | Typescript | React | Node )
          </p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="100px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <ProfileImage
              src="/images/henrique.jpg"
              alt="Profile image"
              borderRadius="full"
              width="100%"
              height="100%"
            />
          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Sobre mim
        </Heading>
        <Paragraph>
          Com anos de experiência no setor financeiro, busco, agora, unir o
          conhecimento obtido ao longo desse período com a tecnologia,
          oferecendo aos clientes soluções que não apenas buscam a melhor
          performance possível, mas, também, levam em consideração os aspectos
          que são singulares a cada empresa.
        </Paragraph>
        <Paragraph>
          Acredito que as soluções tecnológicas que mais agregam valor para as
          empresas são aquelas que são feitas com as reais necessidades do
          cliente em mente.
        </Paragraph>
        <Box align="center" my={4}>
          <NextLink href="/contact" scroll={false} passHref>
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              Entre em contato
            </Button>
          </NextLink>
        </Box>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Habilidades
        </Heading>
        <StackSection>
          <StackTitle>Linguagens</StackTitle>
          <StackContent>Javascript | Typescript | Java</StackContent>
        </StackSection>
        <StackSection align="right">
          <StackTitle>Frameworks | Bibliotecas</StackTitle>
          <StackContent>ReactJs | NextJs | Node/Express</StackContent>
          <StackContent>AdonisJs | Spring</StackContent>
        </StackSection>
        <StackSection>
          <StackTitle>Bancos de dados | ORM | ODM</StackTitle>
          <StackContent>PostgreSQL | MongoDB | LucidORM</StackContent>
          <StackContent>Mongoose | Hibernate</StackContent>
        </StackSection>
        <StackSection align="right">
          <StackTitle>Outros | Em desenvolvimento</StackTitle>
          <StackContent>Docker | CI/CD com Heroku e AWS</StackContent>
          <StackContent>NestJs | Jest</StackContent>
        </StackSection>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Projetos
        </Heading>
        <SimpleGrid columns={[1, 2, 2]} gap={6}>
          <GridItem
            href="https://mern-ecommerce-project-app.herokuapp.com/"
            id="mernEcommerce"
            title="MERN Ecommerce"
            thumbnail={thumbMern}
          >
            Ecommerce construído utilizando React, Node/Express e MongoDB.
            Inclui autenticação/autorização e pagamento via PayPal.
          </GridItem>
          <GridItem
            href="https://product-catalog-nextjs-typescript.netlify.app/"
            id="productCatalog"
            title="Catálogo de Produtos"
            thumbnail={thumbNextTs}
          >
            Display virtual que permite a listagem de produtos por cards e traz
            páginas individuais para cada um. Backend feito em Spring.
          </GridItem>
          <GridItem
            href="https://url-shortener-dio.herokuapp.com/"
            id="urlShortener"
            title="Encurtador de URL"
            thumbnail={thumbNodeTsEx}
          >
            API para encurtar URLs feita com Node/Express e MongoDB. Permite que
            o usuário escolha entre uma URL curta personalizada ou um hash
            gerado aleatoriamente.
          </GridItem>
          <GridItem
            href="https://mern-ecommerce-project-app.herokuapp.com/"
            id="mernEcommerce"
            title="MERN Ecommerce"
            thumbnail={thumbReactTs}
          >
            Ecommerce construído utilizando React, Node/Express e MongoDB.
            Inclui autenticação/autorização e pagamento via PayPal.
          </GridItem>
          <GridItem
            href="https://futureinvest.blog.br/"
            id="blog"
            title="Blog"
            thumbnail={thumbFiBlog}
          >
            Blog 100% responsivo. Para garantir uma melhor experiência de edição
            de conteúdo para o cliente, o blog foi construído em Wordpress.
            Classificação &quot;A&quot; pelo GTMetrix.
          </GridItem>
          <GridItem
            href="https://www.futureinvest.com.br/"
            id="landingPage"
            title="Landing Page"
            thumbnail={thumbFi}
          >
            Landing page em formatos desktop e mobile que utiliza as melhores
            práticas para melhor velocidade de carregamento da página.
            Classificação &quot;A&quot; pelo GTMetrix.
          </GridItem>
        </SimpleGrid>
      </Section>
    </Container>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
