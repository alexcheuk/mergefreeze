import { Request, Response } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Profile } from 'passport-github2'
import { JWTPayload } from '../interfaces/dtos/jwt-payload'

const authenticateWithGithub = passport.authenticate('github', {
  scope: ['user:email'],
})

const githubAuthCallback = (req: Request, res: Response) => {
  passport.authenticate(
    'github',
    {
      session: false,
    },
    (err: any, profile: Profile) => {
      if (err || !profile) return res.status(400)

      console.log(profile)

      req.login(profile, { session: false }, (err) => {
        if (err) {
          res.status(400).send({ err })
        }
        var payload: JWTPayload = {
          displayName: profile.displayName,
          id: profile.id,
          profileUrl: profile.profileUrl,
          provider: profile.provider,
          emails: profile.emails,
          name: profile.name,
          photos: profile.photos,
          username: profile.username,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET || '')

        res.cookie('auth', token, {
          domain: process.env.CLIENT_BASE_URL,
          httpOnly: true,
        })
        res.redirect('/manage')
      })
    }
  )(req, res)
}

const logout = (req: Request, res: Response) => {
  if (req.cookies['auth']) {
    res
      .clearCookie('auth', {
        domain: process.env.CLIENT_BASE_URL,
        httpOnly: true,
      })
      .status(200)
      .redirect('/')
  } else {
    res.status(401).json({
      error: 'Invalid jwt',
    })
  }
}

export default {
  authenticateWithGithub,
  githubAuthCallback,
  logout,
}
