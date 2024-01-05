import { installationDb } from '../data-access'
import { makeDeleteInstallation } from './delete-installation'
import { makeGetInstallationByGithubUserId } from './get-installation'
import { makeSaveInstallationFromGithub } from './save-installation-from-github'

const getInstallationByGithubUserId = makeGetInstallationByGithubUserId({
  installationDb,
})

const saveInstallationFromGithub = makeSaveInstallationFromGithub({
  installationDb,
})

const deleteInstallation = makeDeleteInstallation({
  installationDb,
})

export {
  getInstallationByGithubUserId,
  saveInstallationFromGithub,
  deleteInstallation,
}
