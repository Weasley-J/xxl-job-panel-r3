import React, { lazy } from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar.tsx'
import { Sidebar } from '@/components/layout/Sidebar.tsx'
import Header from '@/components/layout/Header.tsx'
import Footer from '@/components/layout/Footer.tsx'
import Lazy from '@/components/Lazy.tsx'
import useZustandStore from '@/stores/useZustandStore.ts'

const Layout: React.FC = () => {
  const { collapsed } = useZustandStore()

  return (
    <SidebarProvider defaultOpen={collapsed}>
      <Sidebar />
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 overflow-auto px-4 py-2">
            <div className="bg-muted/40 border border-border rounded-lg p-4 h-full">
              <Outlet context={<Lazy Component={lazy(() => import('@/pages/Dashboard'))} />} />
            </div>
          </main>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
