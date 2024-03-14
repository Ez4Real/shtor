const fs = require('fs').promises,
      nodemailer = require('nodemailer'),
      path = require('path'),
      ejs = require('ejs'),
      { HOSTNAME, PORT,
        EMAIL_HOST, EMAIL_PORT,
        EMAIL_USER, EMAIL_PASS } = require('../config'),
      { generateActivationToken } = require('../utils/tokens')


const HOST = HOSTNAME === 'localhost' ? `${HOSTNAME}:${PORT}` : HOSTNAME
const PROTOCOL = HOSTNAME === 'localhost' ? 'http' : 'https'


const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
})

const emailTemplatesDir = path.join(__dirname, '../templates/email')
const logoImagePath = path.join(__dirname, '../images/logo.png')
const ProductImagePath = path.join(__dirname, '../../productPhotos/')


function getMailOptions(
    email, htmlContent,
    subject, productImagesAttachment = null) {
  return {
    from: EMAIL_USER,
    to: email,
    subject: subject,
    html: htmlContent,
    attachments: [
      {path: logoImagePath,
      cid: 'shtorlogo'},
      ...(productImagesAttachment || []),
    ],
  }
}

function productImagesAttachment(products) {
  return products.map((product, index) => ({
    path: path.join(ProductImagePath, product.image),
    cid: `product_${index}`
  }))
}

function getCurrencySymbol(currency) {
  switch(currency) {
      case 'UAH':
        return '₴'
      case 'EUR':
        return '€' 
      case 'USD':
        return '$'
  }
}


async function sendActivationEmail(userId, email) {
  const activationTemplate = path.join(emailTemplatesDir, 'activateSubscription.ejs')
  const templateContent = await fs.readFile(activationTemplate, 'utf-8')

  const activationToken = generateActivationToken(userId)
  const activationLink = `${PROTOCOL}://${HOST}/api/subscribe/activate/${encodeURIComponent(userId)}/${encodeURIComponent(activationToken)}`

  const htmlContent = ejs.render(templateContent, { email, activationLink })

  const mailOptions = getMailOptions(
    email, htmlContent,
    'Activate your subscription for shtor.com.ua'
  )

  await transporter.sendMail(mailOptions)
}


async function sendOrderDetails(language, email, products, currency, amount, shipping_price) {
  const templateName = language === 'uk' ? 'uk.ejs' : 'en.ejs'
  const orderDetailsTemplate = path.join(emailTemplatesDir, '/orderDetails/', templateName)
  const templateContent = await fs.readFile(orderDetailsTemplate, 'utf-8')

  const total_products = products.reduce((sum, product) => sum + product.quantity, 0)
  const currency_symbol = getCurrencySymbol(currency)

  const htmlContent = ejs.render(
    templateContent,
    { email, products, total_products, amount, currency_symbol, shipping_price }
  )

  const mailOptions = getMailOptions(
    email, htmlContent,
    'Product order details purchased on shtor.com.ua',
    productImagesAttachment(products)
  )

  await transporter.sendMail(mailOptions)
}


async function sendTrackingId({
  email, language, tracking_id,
  shipping_type, first_name, last_name,
}) {
  const templateName = language === 'uk' ? 'uk.ejs' : 'en.ejs'
  const trackingIdTemplate = path.join(emailTemplatesDir, '/clientTrackingId/', templateName)
  const templateContent = await fs.readFile(trackingIdTemplate, 'utf-8')

  const email_subject = language === 'uk'
        ? 'Відстеження номеру вашого замовлення'
        : 'Tracking Information for Your Package'
  const shipping_link = shipping_type === 'Ukraine'
        ? 'https://tracking.novaposhta.ua/'
        : 'https://www.ups.com/'

  const htmlContent = ejs.render(
    templateContent,
    { first_name, last_name, tracking_id, shipping_link }
  )

  const mailOptions = getMailOptions(
    email, htmlContent, email_subject,
  )


  await transporter.sendMail(mailOptions)
}



module.exports = {
  sendActivationEmail,
  sendOrderDetails,
  sendTrackingId
}
