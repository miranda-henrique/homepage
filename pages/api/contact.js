/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import nodemailer from 'nodemailer'
import sgTransport from 'nodemailer-sendgrid-transport'

export default (request, response) => {
  const {
    name: requestName,
    email: requestEmail,
    phone: requestPhone
  } = request.body

  console.log({ requestName })
  console.log({ requestEmail })
  console.log({ requestPhone })

  let options = {
    auth: {
      api_user: process.env.NEXT_PUBLIC_SENDGRID_USERNAME,
      api_key: process.env.NEXT_PUBLIC_SENDGRID_API_KEY
    }
  }

  let client = nodemailer.createTransport(sgTransport(options))

  let email = {
    from: process.env.NEXT_PUBLIC_SENDER,
    to: process.env.NEXT_PUBLIC_RECEIVER,
    subject: 'Novo contato de Homepage',
    text: 'For clients with plaintext support only',
    html: `<b><h1>Novo contato de Homepage:</h1> <br /><h3><strong>Nome:</strong> ${requestName}</h3> <br /><h3><strong>Email:</strong> ${requestEmail}</h3> <br /><h3><strong>Telefone:</strong> ${requestPhone}</h3></b>`
  }

  client.sendMail(email, function (err, info) {
    if (err) {
      console.error(err)
    } else {
      console.log({ info })
      console.log('Message sent: ')
    }
  })

  response.status(200).json(request.body)
}
