/* eslint-disable import/no-anonymous-default-export */
const sgMail = require('@sendgrid/mail')

export default async (request, response) => {
  const {
    name: requestName,
    email: requestEmail,
    phone: requestPhone
  } = request.body
  sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY)

  const msg = {
    from: process.env.NEXT_PUBLIC_SENDER,
    to: process.env.NEXT_PUBLIC_RECEIVER,
    subject: 'Novo contato de Homepage',
    text: 'For clients with plaintext support only',
    html: `<b><h1>Novo contato de Homepage:</h1> <br /><h3><strong>Nome:</strong> ${requestName}</h3> <br /><h3><strong>Email:</strong> ${requestEmail}</h3> <br /><h3><strong>Telefone:</strong> ${requestPhone}</h3></b>`
  }

  try {
    const result = await sgMail.send(msg)
    console.log('Email sent', result)
    response.status(200).json(result)
  } catch (error) {
    console.error(error)
  }
}
