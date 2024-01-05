import { useQuery } from '@tanstack/react-query'
import { useInstallationViewModel } from '../../../domains/installation/view-models/InstallationViewModel'

export const useManageViewController = () => {
  const { getInstallation, deleteInstallation } = useInstallationViewModel()

  const { data, isLoading, error } = useQuery({
    queryKey: ['get-installation'],
    queryFn: () => {
      return getInstallation()
    },
  })

  const removeInstallation = async () => {
    await deleteInstallation()

    window.location.reload()
  }

  const showOnboardingSteps = !data?.isInstallationCompleted
  const isMissingGithubInstallation = !data?.githubInstallationId
  const isMissingSlackIntegration = !data?.slackInstallation

  return {
    removeInstallation,
    showOnboardingSteps,
    isMissingGithubInstallation,
    isMissingSlackIntegration,
    installation: data,
    isLoading,
    error,
  }
}
