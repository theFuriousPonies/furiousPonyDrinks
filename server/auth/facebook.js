const passport = require('passport')
const router = require('express').Router()
const FacebookStrategy = require('passport-facebook').Strategy
const { User } = require('../db/models')
module.exports = router

if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
  console.log('Facebook app ID / secret not found. Skipping Facebook OAuth.')
} else {
  const facebookConfig = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FBCALLBACK_URL
  }

  const strategy = new FacebookStrategy(
    facebookConfig,
    async (token, refreshToken, profile, done) => {
      try {
        const info = {
          facebookId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value
        }

        await User.findOrCreate({
          where: { facebookId: info.facebookId },
          defaults: info
        }).spread(user => done(null, user))
      } catch (err) {
        done()
      }
    }
  )

  passport.use(strategy)

  router.get('/', passport.authenticate('facebook', { scope: 'email' }))

  router.get(
    '/callback',
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  )
}
