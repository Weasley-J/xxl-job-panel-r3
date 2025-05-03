// src/components/layout/index.tsx
import React, { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import menuConfig from '@/config/menu.config.ts'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar.tsx'
import { SidebarLeft } from '@/components/layout/SidebarLeft.tsx'
import Header from '@/components/layout/Header.tsx'
import Footer from '@/components/layout/Footer.tsx'
import { Layout } from 'antd'

const { Content } = Layout

const LayoutFC: React.FC = () => {
  const location = useLocation()

  const [showFooter, setShowFooter] = useState(true)

  const renderMenu = (menus: typeof menuConfig, _parentPath = '') =>
    menus.map(item => {
      const fullPath = item.path
      const isActive = location.pathname.startsWith(fullPath)

      return (
        <div key={fullPath}>
          <NavLink
            to={fullPath}
            className={({ isActive }) => `block px-4 py-2 hover:bg-gray-100 ${isActive ? 'bg-gray-200 font-bold' : ''}`}
          >
            {item.name}
          </NavLink>
          {item.children && isActive && <div className="ml-4 border-l pl-2">{renderMenu(item.children, fullPath)}</div>}
        </div>
      )
    })

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <Header />
        {/* 页面整体区域 */}
        <div className="flex flex-col flex-1 min-h-screen">
          {/* 主内容区域：由子路由填充 */}
          <main className="flex-1 p-4">
            <Outlet />
          </main>
          {/* 页面底部 */}
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default LayoutFC
