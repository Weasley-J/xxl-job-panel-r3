import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import NotFound from '@/pages/NotFound'
import ProtectedRoute from '@/components/ProtectedRoute'
import Dashboard from '@/pages/Dashboard'
// 示例页面（你需要按菜单结构来创建对应页面）
import UserManagement from '@/pages/system/UserManagement'
import PermissionManagement from '@/pages/system/PermissionManagement'
import Login from '@/pages/login'

// eslint-disable-next-line react-refresh/only-export-components
export const moduleURIs = { system: '/sys', order: '/order' }

// eslint-disable-next-line react-refresh/only-export-components
export const URIs = {
  home: '/',
  login: '/login',
  welcome: '/welcome',
  dashboard: '/dashboard',
  overflow: '/overflow',
  notFound: '/404',
  noPermission: '/403',
  module: moduleURIs,
  system: {
    user: moduleURIs.system + '/user/list',
    menu: moduleURIs.system + '/menu/list',
    dept: moduleURIs.system + '/dept/list',
    role: moduleURIs.system + '/role/list',
  },
  order: {
    list: moduleURIs.order + '/list',
    shipper: moduleURIs.order + '/shipper',
    aggregation: moduleURIs.order + '/aggregation',
  },
}

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="system/users" element={<UserManagement />} />
        <Route path="system/permissions" element={<PermissionManagement />} />
        {/* ...其他二级页面 */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
