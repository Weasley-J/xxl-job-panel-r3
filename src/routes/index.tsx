import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Layout from '@/components/layout'
// import ProtectedRoute from '@/components/ProtectedRoute'
import Dashboard from '@/pages/Dashboard'
import LoginPage from '@/pages/login'
import OverflowTest from '@/pages/extra/OverflowTest'
import Error404 from '@/pages/error/Error404.tsx'

// 所有路径统一管理
const URIs = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  overflow: '/overflow',
  report: '/report',
  tasks: '/tasks',
  logs: '/logs',
  executors: '/executors',
  users: '/users',
  notFound: '/404',
  noPermission: '/403',
}

// 页面组件封装（可以考虑拆到单独文件）
const components = {
  ReportComponent: () => <>ReportComponent</>,
  TaskManagerComponent: () => <>你好 TaskManagerComponent</>,
  LogViewerComponent: () => <>LogViewerComponent</>,
  ExecutorComponent: () => <>ExecutorComponent</>,
  UserComponent: () => <>UserComponent</>,
}

// 路由配置
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 登录页 */}
      <Route path={URIs.login} element={<LoginPage />} />

      {/* 受保护页面区域 */}
      <Route
        path={URIs.home}
        element={
          // <ProtectedRoute>
          //   <Layout />
          // </ProtectedRoute>
          <Layout />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path={URIs.dashboard} element={<Dashboard />} />
        <Route path={URIs.overflow} element={<OverflowTest />} />
        <Route path={URIs.report} element={<components.ReportComponent />} />
        <Route path={URIs.tasks} element={<components.TaskManagerComponent />} />
        <Route path={URIs.logs} element={<components.LogViewerComponent />} />
        <Route path={URIs.executors} element={<components.ExecutorComponent />} />
        <Route path={URIs.users} element={<components.UserComponent />} />
      </Route>

      {/* 404 页面 */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}

// 导出组件与路径配置
export { URIs, AppRoutes, components as PageComponents }
