/* 导出所有类型. */

export interface ApiResponse<T = any> {
  code: number
  msg: string
  content?: T
}
