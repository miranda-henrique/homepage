/* eslint-disable no-unused-vars */
import { Container, Heading } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button
} from '@chakra-ui/react'

import {
  useNetlifyForm,
  NetlifyFormProvider,
  NetlifyFormComponent,
  Honeypot
} from 'react-netlify-forms'

const Contact = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm()

  const netlify = useNetlifyForm({
    name: 'react-hook-form',
    action: '/thanks',
    honeypotName: 'bot-field',
    onSuccess: (response, context) => {
      console.log('Successfully sent form data to Netlify Server')
    }
  })

  const onSubmit = data => netlify.handleSubmit(null, data)

  return (
    <Layout title="Contato">
      <Container minH="100vh">
        <Heading as="h3" fontSize={30} mb={4} mt={100}>
          Contato
        </Heading>

        <Section delay={0.1}>
          <NetlifyFormProvider {...netlfy}>
            <NetlifyFormComponent onSubmit={handleSubmit(onSubmit)}>
              <Honeypot />
              {netlify.success && (
                <p sx={{ variant: 'alerts.success', p: 3 }}>
                  Obrigado! O contato será retornado em breve!
                </p>
              )}
              {netlify.error && (
                <p sx={{ variant: 'alerts.muted', p: 3 }}>
                  Parece que houve um erro no envio. Poderia tentar novamente
                  mais tarde?
                </p>
              )}
              <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <Input
                  id="name"
                  placeholder="Nome"
                  {...register('name', {
                    required: 'É necessário informar seu nome',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4'
                    }
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.phone}>
                <FormLabel htmlFor="phone">
                  Telefone <strong>(apenas números)</strong>
                </FormLabel>
                <Input
                  id="phone"
                  placeholder="Insira seu número de WhatsApp ou de telefone"
                  {...register('phone', {
                    required: 'Por favor, insira um número para contato',
                    pattern:
                      /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/
                  })}
                />
                <FormErrorMessage>
                  {errors.phone && errors.phone.message}
                  {errors.phone?.type === 'pattern' &&
                    'Insira um telefone válido'}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <Input
                  id="email"
                  placeholder="Seu melhor e-mail"
                  {...register('email', {
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                  {errors.email?.type === 'pattern' &&
                    'Insira um e-mail válido'}
                </FormErrorMessage>
              </FormControl>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Enviar
              </Button>
            </NetlifyFormComponent>
          </NetlifyFormProvider>
        </Section>
      </Container>
    </Layout>
  )
}

export default Contact
export { getServerSideProps } from '../components/chakra'
