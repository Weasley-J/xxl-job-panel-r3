import apiClient from '@/api/apiClient.ts'
import { LoginParams } from '@/types/auth.ts'
import { Result, User } from '@/types'

/**
 * API Request Entities Management
 */
export default {
  user: {
    login(params: LoginParams) {
      return apiClient.post<Result>('/login', undefined, { params })
    },
    logout() {
      return apiClient.post<Result>('/logout', undefined)
    },
    editPwd(params: User.EditPwdParams) {
      return apiClient.post<Result>('/user/updatePwd', undefined, { params })
    },
    getUserList(params: User.UserPageQuery) {
      return apiClient.post<User.UserPageListResponse>('/user/pageList', undefined, { params })
    },
  },

  job: {},
}
