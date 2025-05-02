import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Breadcrumb from '@/components/layout/Breadcrumb.tsx'

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-100 p-4">
          <Breadcrumb />
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
