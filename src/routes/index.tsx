import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Layout from '@/components/layout'
import Dashboard from '@/pages/dashboard/index'
import LoginPage from '@/pages/login'
import OverflowTest from '@/pages/extra/OverflowTest'
import Error404 from '@/pages/error/Error404.tsx'
import { isFalse } from '@/common/booleanUtils'
import ProtectedRoute from '@/routes/ProtectedRoute.tsx'

// 所有路径统一管理
const URIs = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  overflow: '/overflow',
  tasks: '/tasks',
  logs: '/logs',
  users: '/users',
  executors: '/executors',
  notFound: '/404',
  noPermission: '/403',
}

// 页面组件封装（可以考虑拆到单独文件）
const components = {
  TaskManagerComponent: () => <>你好 TaskManagerComponent</>,
  LogViewerComponent: () => <>LogViewerComponent</>,
  ExecutorComponent: () => <>ExecutorComponent</>,
  UserComponent: () => <>UserComponent</>,
}

// 路由配置
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={URIs.login} element={<LoginPage />} />

      <Route
        path={URIs.home}
        element={
          isFalse(import.meta.env.VITE_ENABLE_AUTH) ? (
            <Layout />
          ) : (
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          )
        }
      >
        <Route index element={<Dashboard />} />
        <Route path={URIs.dashboard} element={<Dashboard />} />
        <Route path={URIs.overflow} element={<OverflowTest />} />
        <Route path={URIs.tasks} element={<components.TaskManagerComponent />} />
        <Route path={URIs.logs} element={<components.LogViewerComponent />} />
        <Route path={URIs.executors} element={<components.ExecutorComponent />} />
        <Route path={URIs.users} element={<components.UserComponent />} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}

// 导出组件与路径配置
export { URIs, AppRoutes, components as PageComponents }
