import {
  InstallationDTO,
  InstallationModel,
} from '../../../data/models/InstallationModel'

class InstallationViewModel {
  installation: InstallationDTO

  constructor(installation: InstallationDTO) {
    this.installation = {
      ...installation,
    }
  }

  get githubUserId() {
    return this.installation.githubUserId
  }

  get githubInstallationId() {
    return this.installation.githubInstallationId
  }

  get slackTeamId() {
    return this.installation.slackTeamId
  }

  get slackInstallation() {
    return this.installation.slackInstallation
  }

  get isInstallationCompleted(): boolean {
    const { githubInstallationId, slackInstallation, slackTeamId } =
      this.installation

    return Boolean(githubInstallationId && slackInstallation && slackTeamId)
  }
}

export const useInstallationViewModel = () => {
  const getInstallation = () => {
    return InstallationModel.getInstallation().then(
      (installation) => new InstallationViewModel(installation)
    )
  }

  const deleteInstallation = () => {
    return InstallationModel.deleteInstallation()
  }

  return {
    getInstallation,
    deleteInstallation,
  }
}
