/* 导出所有类型. */

export interface Result<T = any> {
  code: number
  msg: string
  data?: T
  content?: T
}

export namespace User {
  export interface Info {
    id?: string
    username: string
  }

  export interface UserPageQuery {
    start?: number // 分页起始位置，默认 0
    length?: number // 分页长度，默认 10
    username?: string // 用户名，必填
    role?: number // 用户角色，可选：0 = 普通用户，1 = 管理员
  }

  export interface UserRecord {
    id: number
    username: string
    password?: string | null
    role: number // 0: 普通用户, 1: 管理员
    permission?: string | null
  }

  export interface UserPageListResponse {
    recordsTotal: number
    recordsFiltered: number
    data: UserRecord[]
  }

  export interface EditPwdParams {
    password: string
    oldPassword: string
  }
}
