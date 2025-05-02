export interface User {
  id: number
  username: string
  email: string
  role: string
  status: 'active' | 'disabled'
}

export interface UserResponse {
  data: User[]
  total: number
}
