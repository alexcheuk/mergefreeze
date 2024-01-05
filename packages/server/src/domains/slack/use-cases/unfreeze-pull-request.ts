import { MergeFreezeStatusDb } from '../../installation/interfaces'
import { SetUnfrozenStatusDTO } from '../../merge-freeze-status/interfaces/dtos/set-unfrozen-status-dto'
import { makeGithubDb } from '../../github/data-access/github.db'

interface Dependency {
  mergeFreezeStatusDb: MergeFreezeStatusDb
  makeGithubDb: typeof makeGithubDb
}

export const makeUnfreezePullRequests = ({
  mergeFreezeStatusDb,
  makeGithubDb,
}: Dependency) => {
  return async (
    installationId: number,
    { owner, repo, source, id, name, metadata }: SetUnfrozenStatusDTO
  ) => {
    const asyncTasks = []

    asyncTasks.push(
      mergeFreezeStatusDb.unfreeze({
        owner,
        repo,
        source,
        id,
        name,
        metadata,
      })
    )

    const gh = makeGithubDb({
      installationId,
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
                    conclusion: 'success',
                    title: '☀️ Merge OK',
                  })
                )
              })
            }
          })

        asyncTasks.push(checksPromise)
      })
    }

    return Promise.all(asyncTasks)
  }
}
