require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
app.use(bodyParser.json({ limit: '1000kb' }))
const models = require('./models')
const bullQueues = require('./controllers/queue')
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'
bullQueues.createQueues()
const g5Auth = require('../../g5-auth-js')
const {
  G5_AUTH_ENDPOINT: authorizationURL,
  G5_TOKEN_ENDPOINT: tokenURL,
  G5_AUTH_CLIENT_ID: clientID,
  G5_AUTH_CLIENT_SECRET: clientSecret,
  G5_AUTH_REDIRECT_URI: callbackURL,
  G5_AUTH_ME_ENDPOINT: authMeEndpoint,
  SESSION_SECRET: secret
} = process.env

const authConfig = {
  passport: {
    authorizationURL,
    tokenURL,
    clientID,
    clientSecret,
    callbackURL
  },
  authMeEndpoint,
  session: {
    secret
  },
  sucessRedirectPath: '/'
}

g5Auth.init(app, authConfig)
app.use(g5Auth.isAuthenticated)
app.use(async function (req, res, next) {
  const { id } = req.user
  const user = await models.user.findOne({
    where: { id },
    include: [{ model: models.role }]
  })
  const userJson = user.toJSON()
  req.userRoles = userJson.roles.map((role) => {
    const { name, type, urn } = role
    return { name, type, urn }
  })
  next()
})
require('./controllers/queue')
require('./routes')(app)

async function start () {
  const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server

  await nuxt.ready()
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(nuxt.render)
  models.sequelize
    .sync()
    .then(() => consola.ready({ message: 'Database Synced', badge: true }))
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
