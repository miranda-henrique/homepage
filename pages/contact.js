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

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const HookForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm()

  const onSubmit = (data, e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'react-validation-form',
        ...data
      })
    })
      .then(response => {
        reset()
        navigate(form.getAttribute('action'))
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <Layout title="Posts">
        <Container minH="100vh">
          <Heading as="h3" fontSize={30} mb={4} mt={100}>
            Contato
          </Heading>

          <Section delay={0.1}>
            <form onSubmit={handleSubmit(onSubmit)} netlify>
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
            </form>
          </Section>
        </Container>
      </Layout>
    </>
  )
}

export default HookForm
export { getServerSideProps } from '../components/chakra'
