import { installationDb } from '../../installation/data-access'
import { makeGithubDb } from '../../github/data-access/github.db'
import { makeFreezeRepos } from './freeze-repos'
import { makeUnfreezePullRequests } from './unfreeze-pull-request'
import { makeRequestMergeFreeze } from './request-merge-freeze'
import { mergeFreezeStatusDb } from '../../merge-freeze-status/data-access'

export const freezeRepos = makeFreezeRepos({
  makeGithubDb,
  mergeFreezeStatusDb,
  installationDb,
})

export const unfreezePullRequests = makeUnfreezePullRequests({
  makeGithubDb,
  mergeFreezeStatusDb,
})

export const requestMergeFreeze = makeRequestMergeFreeze({
  installationDb,
})
