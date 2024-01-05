import { SlashCommand } from '@slack/bolt'
import { MergeFreezeStatusDb } from '../../installation/interfaces'
import { buildMergeFreezeModal } from '../utils/slack-messages'
import { InstallationDb } from '../../installation/interfaces/data-access/installation-db'

interface Dependencies {
  installationDb: InstallationDb
}

export const makeRequestMergeFreeze = ({ installationDb }: Dependencies) => {
  return async ({
    slackTeamId,
    triggerId,
    channelId,
  }: {
    slackTeamId: string
    triggerId: SlashCommand['trigger_id']
    channelId: SlashCommand['channel_id']
  }) => {
    const installation = await installationDb.getInstallationBySlackTeamId(
      slackTeamId
    )

    return buildMergeFreezeModal({
      triggerId,
      channelId,
      repos: [
        {
          text: {
            text: 'procurify-react',
            type: 'plain_text',
          },
        },
        {
          text: {
            text: 'procurifydevelopment',
            type: 'plain_text',
          },
        },
        {
          text: {
            text: 'mergefreeze',
            type: 'plain_text',
          },
        },
      ],
    })
  }
}
