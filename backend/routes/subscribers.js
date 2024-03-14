const express = require('express'),
    subscriberRouter = express.Router(),
    sendResponse = require('../utils/response'),
    { Subscriber } = require('../models'),
    { sendActivationEmail } = require('../services/email'),
    { validateActivationToken } = require('../utils/tokens'),
    { HOSTNAME, PORT } = require('../config');


const HOST = HOSTNAME === 'localhost' ? `${HOSTNAME}:${PORT}` : HOSTNAME
const PROTOCOL = HOSTNAME === 'localhost' ? 'http' : 'https';


subscriberRouter.post('/', async (req, res) => {
    const { email } = req.body
    let subscriber = await Subscriber.findOne({ email })

    if (!subscriber) {
        subscriber = new Subscriber({ email })
        await subscriber.save()
    }
    if (subscriber.is_active) {
        return sendResponse(res, 400, false, {email: email}, 'This email is already subscribed')
    }
    try {
        await sendActivationEmail(subscriber.id, email)
    } catch (error) {
        return sendResponse(res, 500, false, {}, `Error sending activation email - ${error}`)
    }
    return sendResponse(res, 200, true, {}, `Email sent on ${email}. Please, activate subscription`)
})

subscriberRouter.get('/activate/:userId/:token/:lang', async (req, res) => {
    const { userId, token, lang } = req.params

    if (!validateActivationToken(userId, token)) {
      return sendResponse(res, 400, false, {}, 'Invalid activation token')
    }

    try {
      const subscriber = await Subscriber.findById(userId)
      if (!subscriber) {
        return sendResponse(res, 404, false, {}, 'Subscriber not found')
      }

      subscriber.is_active = true
      subscriber.mailing_language = lang
      await subscriber.save()

      const thankYouSubscribe = `${PROTOCOL}://${HOST}/thank-you-subscribe`;
      return res.redirect(thankYouSubscribe)
    } catch (error) {
      return sendResponse(res, 500, false, {}, 'Error activating subscription')
    }
})

subscriberRouter.get('/deactivate/:userId/:token', async (req, res) => {
    const { userId, token } = req.params

    if (!validateDeactivationToken(userId, token)) {
      return sendResponse(res, 400, false, {}, 'Invalid deactivation token')
    }

    try {
      const subscriber = await Subscriber.findById(userId)
      if (!subscriber) {
        return sendResponse(res, 404, false, {}, 'Subscriber with this email not found')
      }
      if (!subscriber.is_active) {
        return sendResponse(res, 400, false, {}, 'This email is already inactive')
      }

      subscriber.is_active = false
      await subscriber.save()

      return sendResponse(res, 200, true, {}, 'Subscription removed successfully')
    } catch (error) {
      console.error('Error removing subscription:', error.message)
      return sendResponse(res, 500, false, {}, 'Error removing subscription')
    }
  })

module.exports = subscriberRouter
