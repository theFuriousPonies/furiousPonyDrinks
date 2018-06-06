const router = require('express').Router()
const passport = require('passport'),
  TwitterStrategy = require('passport-twitter').Strategy
const { User } = require('../db/models')
module.exports = router

if (!process.env.TWITTER_CLIENT_ID || !process.env.TWITTER_CLIENT_SECRET) {
  console.log('TWITTER client ID / secret not found. Skipping TWITTER OAuth.')
} else {
  const twitterConfig = {
    clientID: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  }

  const strategy = new TwitterStrategy(
    twitterConfig,
    async (token, refreshToken, profile, done) => {
      const info = {
        twitterId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      }
      User.findOrCreate({
        where: {
          twitterId: info.twitterId
        },
        defaults: info
      })
        .spread(user => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  // Redirect the user to Twitter for authentication.  When complete, Twitter
  // will redirect the user back to the application at
  //   /auth/twitter/callback
  router.get('/', passport.authenticate('twitter'))

  // Twitter will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  router.get(
    'callback',
    passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  )
}
