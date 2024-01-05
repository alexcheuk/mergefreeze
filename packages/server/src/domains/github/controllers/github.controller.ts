import { Request, Response } from 'express'
import {
  WebhookEventName,
  InstallationEvent,
  InstallationRepositoriesEvent,
} from '@octokit/webhooks-types'
import {
  deleteInstallation,
  saveInstallationFromGithub,
} from '../../installation'

const eventsController = async (req: Request, res: Response) => {
  const event = req.headers['x-github-event'] as WebhookEventName

  console.log(`Received Github Event: ${event}`)
  console.log(`Received Github Payload:`, req.body)

  switch (event) {
    case 'installation':
      const installationEvent: InstallationEvent = req.body

      switch (installationEvent.action) {
        case 'created':
          await saveInstallationFromGithub(
            installationEvent.sender.id,
            installationEvent.installation.id,
            installationEvent.repositories?.map((repo) => {
              const [owner, repoName] = repo.full_name.split('/')

              return {
                owner,
                repo: repoName,
              }
            }) || []
          )

          return res.status(200).send()
        case 'deleted':
          await deleteInstallation(installationEvent.sender.id)

          return res.status(200).send()
      }

      return res.status(200).send()

    case 'installation_repositories':
      const repoEvent: InstallationRepositoriesEvent = req.body

    default:
      return res.status(200).send()
  }
}

export default { eventsController }
