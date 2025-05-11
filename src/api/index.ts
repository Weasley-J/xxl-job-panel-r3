import apiClient from '@/api/apiClient.ts'
import { LoginParams } from '@/types/auth.ts'
import { ChartInfoParams, ChartInfoResponse, Job, Result, TDashboardTaskStats, User } from '@/types'

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
      return apiClient.get<User.UserPageListResponse>('/user/pageList', undefined, { params })
    },
    getUserGroupPermissions() {
      return apiClient.get<Job.JobGroupInfoPermissions>('/r3/support/v1/user/group/permissions', undefined, {})
    },
    deleteUser(params: { id: number }) {
      return apiClient.post<Result>('/user/remove', undefined, { params }) // 👈 params 会被自动拼到 URL 上
    },
  },
  dashboard: {
    getCartInfo(params: ChartInfoParams) {
      return apiClient.post<ChartInfoResponse>('/chartInfo', undefined, { params })
    },
    getJobRunningOverview() {
      return apiClient.get<TDashboardTaskStats>('/r3/support/v1/job/report/overview')
    },
  },
  job: {},
}
