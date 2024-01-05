import SlackBolt, { Installation } from '@slack/bolt'
import { installationDb } from '../../installation/data-access'
import passport from 'passport'
import { JWTPayload } from '../../auth/interfaces/dtos/jwt-payload'

const { App, ExpressReceiver } = SlackBolt

const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || '',
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,

  scopes: [
    'channels:read',
    'chat:write',
    'commands',
    'groups:read',
    'im:history',
    'incoming-webhook',
    'users:read',
    'channels:join',
  ],
  installationStore: {
    storeInstallation: async () => {},
    fetchInstallation: async (installQuery) => {
      const installation = await installationDb.getInstallationBySlackTeamId(
        installQuery.teamId as string
      )

      return installation?.slackInstallation as Installation<'v2'>
    },
    deleteInstallation: async (installQuery) => {},
  },
  redirectUri: 'http://mergefreeze.local/auth/slack/callback',
  installerOptions: {
    stateVerification: false,
    redirectUriPath: '/auth/slack/callback',
    callbackOptions: {
      afterInstallation: (installation, options, req, res) => {
        return new Promise((resolve) => {
          passport.authenticate(
            'jwt',
            {},
            async (_: any, jwtPayload: JWTPayload) => {
              await installationDb.upsertSlackIntegration(
                Number(jwtPayload.id),
                {
                  slackTeamId: installation.team?.id || '',
                  slackInstallation: installation as Installation<'v2'>,
                }
              )

              resolve(false)

              res.writeHead(302, {
                Location: '/manage',
              })
              res.end()
            }
          )(req, res)
        })
      },
    },
  },
})

const app = new App({
  receiver,
})

export { receiver, app }
