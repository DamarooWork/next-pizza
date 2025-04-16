import { User } from '@prisma/client'
import { axiosInstance } from './instance'

export const getAuthUser = async () => {
  const { data } = await axiosInstance.get<User>('/auth/user-info')

  return data
}
