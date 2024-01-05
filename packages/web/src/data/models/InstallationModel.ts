import {
  InstallationDataSource,
  getOne,
  deleteAll,
} from '../data-sources/InstallationDataSource'

export type InstallationDTO = InstallationDataSource

export const InstallationModel = {
  getInstallation: () => {
    return getOne()
  },
  deleteInstallation: () => {
    return deleteAll()
  },
}
