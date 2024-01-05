import { PropsWithChildren, createContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ProfileDTO } from '../../../data/models/ProfileModel'
import { ApiClient } from '../../../data/api/ApiClient'

export interface AuthContext {
  isLoggedIn: boolean
  isLoading: boolean
  user: ProfileDTO | null
}

const DEFAULT_STATE = {
  isLoggedIn: false,
  isLoading: false,
  user: null,
}

export const AuthContext = createContext<AuthContext>(DEFAULT_STATE)

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const {
    data,
    error,
    isLoading: isFetchingProfile,
  } = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => {
      return ApiClient.get('/api/profile').then((res) => res.data)
    },
  })

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !error && data,
        isLoading: isFetchingProfile,
        user: data,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
