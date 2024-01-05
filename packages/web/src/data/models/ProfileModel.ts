import { ApiClient } from '../api/ApiClient'

export interface ProfileDTO {
  provider: string
  id: string
  displayName: string
  username?: string | undefined
  name?:
    | {
        familyName: string
        givenName: string
        middleName?: string | undefined
      }
    | undefined
  emails?:
    | Array<{
        value: string
        type?: string | undefined
      }>
    | undefined
  photos?: Array<{
    value: string
  }>
  profileUrl: string
}

export const ProfileModel = {
  getProfile: () => {
    return ApiClient.get<ProfileDTO>('/api/profile').then((res) => res.data)
  },
}
