import cookie from 'cookie'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as GitHubStrategy } from 'passport-github2'
import passport from 'passport'
import { Request } from 'express'
import { IncomingMessage } from 'http'

const cookieExtractor = (req: Request | IncomingMessage) => {
  let jwt = null

  if (req && 'cookies' in req) {
    jwt = req.cookies['auth']
  } else {
    const cookies = cookie.parse(req.headers['cookie'] || '')

    jwt = cookies['auth']
  }

  return jwt
}

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET, // Specify a JWT secret in .env file
    },
    function (jwtPayload, done) {
      // find the user in db if needed.
      // This functionality may be omitted if you store everything you'll need in JWT payload.
      return done(null, jwtPayload)
    }
  )
)
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      callbackURL: process.env.GITHUB_CALLBACK_URL || '',
    },
    (
      accessToken: any,
      refreshToken: any,
      profile: any,
      cb: (arg0: null, arg1: any) => void
    ) => {
      cb(null, profile)
    }
  )
)
