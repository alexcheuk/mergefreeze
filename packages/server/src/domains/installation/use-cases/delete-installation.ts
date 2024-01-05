import { InstallationDb } from '../interfaces/data-access/installation-db'

interface Dependency {
  installationDb: InstallationDb
}

export const makeDeleteInstallation = ({ installationDb }: Dependency) => {
  return (githubUserId: number) => {
    return installationDb.deleteAllInstallationByGithubUserId(githubUserId)
  }
}
