import {
  Container,
  Heading,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
  createStandaloneToast
} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import axios from 'axios'

const phonePattern =
  /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default function Contact() {
  const [nameError, setNameError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [emailError, setEmailError] = useState('')

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: ''
    },
    validate: values => {
      const error = {}
      const noNameMessage = 'Insira seu nome'
      const noEmailMessage = 'Insira um email para contato'
      const invalidEmailMessage = 'Insira um email válido'
      const noPhoneMessage = 'Insira um telefone para contato'
      const invalidPhoneMessage = 'Insira um telefone válido'
      if (!values.name) error.name = noNameMessage
      if (!values.phone) error.phone = noPhoneMessage
      if (!values?.phone.match(phonePattern)) error.phone = invalidPhoneMessage
      if (!values.email) error.email = noEmailMessage
      if (!values?.email.match(emailPattern)) error.email = invalidEmailMessage
      if (!values.email && !values?.email.match(emailPattern))
        error.email = 'Insira um email válido para contato'
      return error
    },
    onSubmit: async values => {
      let config = {
        method: 'post',
        url: '/api/contact',
        headers: {
          'Content-Type': 'application/json'
        },
        data: values
      }

      try {
        const response = await axios(config)
        if (response.status === 200) {
          const toast = createStandaloneToast()

          toast({
            title: 'Mensagem enviada!',
            description: 'Obrigado! Logo retornarei o contato.',
            status: 'success',
            duration: 9000,
            isClosable: true
          })
          formik.values.name = ''
          formik.values.phone = ''
          formik.values.email = ''
          console.log('Success')
        }
      } catch (error) {
        const toast = createStandaloneToast()

        toast({
          title: 'Erro ao enviar a mensagem.',
          description: 'Poderia tentar novamente mais tarde?',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
        console.error({ error })
      }
    }
  })

  useEffect(() => {
    if (formik.errors.name) {
      setNameError(formik.errors.name)
    }

    if (formik.errors.phone) {
      setPhoneError(formik.errors.phone)
    }

    if (formik.errors.email) {
      setEmailError(formik.errors.email)
    }
  }, [formik])

  return (
    <Layout title="Contato">
      <Container minH="100vh">
        <Heading as="h3" fontSize={30} mb={4} mt={100}>
          Contato
        </Heading>

        <Section delay={0.1}>
          <Flex align="center" justify="center">
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl isInvalid={formik.errors.name}>
                  <FormLabel htmlFor="name">Nome</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Insira seu nome"
                    variant="filled"
                    width={[300, 500]}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <FormErrorMessage>{nameError}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.errors.phone}>
                  <FormLabel htmlFor="phone">
                    Telefone <strong>(apenas números)</strong>
                  </FormLabel>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Insira um telefone para contato"
                    variant="filled"
                    width={[300, 500]}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                  />
                  <FormErrorMessage>{phoneError}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.errors.email}>
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Insira seu email"
                    variant="filled"
                    width={[300, 500]}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  <FormErrorMessage>{emailError}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="teal" isFullWidth>
                  Enviar
                </Button>
              </VStack>
            </form>
          </Flex>
        </Section>
      </Container>
    </Layout>
  )
}
