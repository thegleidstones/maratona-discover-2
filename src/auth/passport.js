const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
require('dotenv').config()

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/github/callback'
}, (accessToken, refeshToken, profile, done) => {
    return done(null, profile)
}))