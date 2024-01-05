import { makeSlackDb } from './slack.db'

const slackDb = makeSlackDb({
  generateInstallationUrl: async (scopes) => {
    return `https://slack.com/oauth/v2/authorize?client_id=${
      process.env.SLACK_CLIENT_ID
    }&scope=${scopes.join(',')}`
  },
})

export { slackDb }
