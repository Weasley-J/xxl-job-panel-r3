import apiClient from '@/api/apiClient.ts'
import { LoginParams } from '@/types/auth.ts'
import { ApiResponse } from '@/types'

/**
 * API Request Entities Management
 */
export default {
  user: {
    // 登录
    login(params: LoginParams) {
      return apiClient.post<ApiResponse>('/login', undefined, { params })
    },
    // 登出
    logout() {
      return apiClient.post<any>('www.baidu.com')
    },
    getUserList() {},
  },

  job: {},
}
