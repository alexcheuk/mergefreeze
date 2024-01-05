import { InstallationModelSchema } from '@mf/server/src/domains/installation/interfaces/models/installation-model'
import { ApiClient } from '../api/ApiClient'

export type InstallationDataSource = InstallationModelSchema

export const getOne = async () => {
  return ApiClient.get<InstallationDataSource>('/api/installation').then(
    (res) => res.data
  )
}

export const deleteAll = async () => {
  return ApiClient.delete<InstallationDataSource>('/api/installation')
}
