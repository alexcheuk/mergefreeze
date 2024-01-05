import { MergeFreezeStatusDb } from '../../installation/interfaces'
import { makeGithubDb } from '../../github/data-access/github.db'
import { InstallationDb } from '../../installation/interfaces/data-access/installation-db'

interface Dependency {
  mergeFreezeStatusDb: MergeFreezeStatusDb
  installationDb: InstallationDb
  makeGithubDb: typeof makeGithubDb
}

export const makeFreezeRepos = ({
  mergeFreezeStatusDb,
  installationDb,
  makeGithubDb,
}: Dependency) => {
  return async ({
    slackTeamId,
    requesterId,
    requesterName,
    reason,
    repos,
  }: {
    slackTeamId: string
    requesterId: string
    requesterName: string
    reason: string
    repos: { owner: string; repo: string }[]
  }) => {
    const asyncTasks: Promise<any>[] = []

    const installation = await installationDb.getInstallationBySlackTeamId(
      slackTeamId
    )

    repos.forEach(async ({ owner, repo }) => {
      asyncTasks.push(
        mergeFreezeStatusDb.freeze({
          owner,
          repo,
          source: 'slack',
          id: requesterId,
          name: requesterName,
          reason,
          metadata: null,
        })
      )

      const gh = makeGithubDb({
        installationId: installation?.id,
        owner,
        repo,
      })

      const openPrs = (await gh.getOpenPrs()).data

      if (openPrs.length && openPrs.length > 1) {
        openPrs.forEach((pr) => {
          const checksPromise = gh
            .getChecksByRef(pr.head.sha)
            .then((res) => res.data.check_runs)
            .then((checkRuns = []) => {
              if (checkRuns?.length > 0) {
                checkRuns.forEach((check) => {
                  asyncTasks.push(
                    gh.updateCheck(check.id, {
                      conclusion: 'failure',
                      title: 'Merge Freezed',
                    })
                  )
                })
              } else {
                asyncTasks.push(
                  gh.createCheck(pr.head.sha, {
                    conclusion: 'failure',
                    title: 'Merge Freezed',
                  })
                )
              }
            })

          asyncTasks.push(checksPromise)
        })
      }
    })

    return Promise.all(asyncTasks)
  }
}
