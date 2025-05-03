import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LayoutFC from '@/components/layout' // 👈 新的 Index
import NotFound from '@/pages/NotFound'
import ProtectedRoute from '@/components/ProtectedRoute'
import Dashboard from '@/components/Dashboard'
import UserManagement from '@/pages/system/UserManagement'
import PermissionManagement from '@/pages/system/PermissionManagement'
import LoginPage from '@/pages/login'

// eslint-disable-next-line react-refresh/only-export-components
export const moduleURIs = { system: '/sys', order: '/order' }

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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedRoute><LayoutFC /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="system/users" element={<UserManagement />} />
        <Route path="system/permissions" element={<PermissionManagement />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
