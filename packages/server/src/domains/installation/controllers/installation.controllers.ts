import { RequestHandler } from 'express'
import {
  getInstallationByGithubUserId,
  deleteInstallation as deleteInstallationUseCase,
} from '../use-cases'

export const getInstallation: RequestHandler = async (req, res) => {
  const githubUserId = req?.user?.id

  const installation = await getInstallationByGithubUserId(Number(githubUserId))

  res.json(installation)
}

export const deleteInstallation: RequestHandler = async (req, res) => {
  const githubUserId = req?.user?.id

  await deleteInstallationUseCase(Number(githubUserId))

  res.status(200).end()
}

export default {
  getInstallation,
  deleteInstallation,
}
