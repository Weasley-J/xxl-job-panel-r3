// 更高级做法: 后端返回角色权限，还可以控制菜单、按钮权限
export const isAuthenticated = () => {
  return Boolean(localStorage.getItem('token'))
}

export const login = (token: string) => {
  localStorage.setItem('token', token)
}

export const logout = () => {
  localStorage.removeItem('token')
}
