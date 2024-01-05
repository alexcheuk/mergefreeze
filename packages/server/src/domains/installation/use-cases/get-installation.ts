import { InstallationDb } from '../interfaces/data-access/installation-db'

interface Dependency {
  installationDb: InstallationDb
}

export const makeGetInstallationByGithubUserId = ({
  installationDb,
}: Dependency) => {
  return (githubUserId: number) => {
    return installationDb.getInstallationByGithubUserId(githubUserId)
  }
}
