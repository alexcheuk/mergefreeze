import {
  Middleware,
  SlackCommandMiddlewareArgs,
  SlackViewMiddlewareArgs,
} from '@slack/bolt'
import { requestMergeFreeze, freezeRepos } from '../use-cases'
import { buildMergeFrozenMessage } from '../utils/slack-messages/build-merge-frozen-message'
import { MergeFreezeModalSubmissionValuesDTO } from '../interfaces/dtos/merge-freeze-modal-submission-dto'
import { RequestHandler } from 'express'
import { slackDb } from '../data-access'

const mergeFreeze: Middleware<SlackCommandMiddlewareArgs> = async ({
  ack,
  body,
  client,
}) => {
  await ack()

  const modalOptions = await requestMergeFreeze({
    triggerId: body.trigger_id,
    channelId: body.channel_id,
  })

  try {
    await client.views.open(modalOptions)
  } catch (e) {}
}

const mergeFreezeModalSubmission: Middleware<
  SlackViewMiddlewareArgs,
  { text: string }
> = async ({ ack, body, client }) => {
  await ack()

  try {
    const formValues = body.view.state
      .values as MergeFreezeModalSubmissionValuesDTO

    const reason = formValues?.reason_block?.reason_input.value || ''

    await freezeRepos({
      slackTeamId: body.team?.id || '',
      reason,
      repos: [],
      requesterId: body.user.id,
      requesterName: body.user.name,
    })

    await client.chat.postMessage(
      buildMergeFrozenMessage({
        channelId: body.view.private_metadata,
        requestedByUserId: body.user.id,
        repos: [],
        reason,
      })
    )
  } catch (e) {}
}

const installSlack: RequestHandler = async (req, res) => {
  res.redirect(
    await slackDb.getInstallationUrl([
      'channels:read',
      'chat:write',
      'commands',
      'groups:read',
      'im:history',
      'incoming-webhook',
      'users:read',
      'channels:join',
    ])
  )
}

export default {
  mergeFreeze,
  mergeFreezeModalSubmission,
  installSlack,
}
