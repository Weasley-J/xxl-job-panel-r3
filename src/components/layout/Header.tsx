import React from 'react'
import { Separator } from '@/components/ui/separator.tsx'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx'
import { URIs } from '@/routes'
import { ToggleTheme } from '@/components/ToggleTheme.tsx'
import { SidebarTrigger } from '@/components/ui/sidebar.tsx'
import useZustandStore from '@/stores/useZustandStore.ts'

const Header: React.FC = () => {
  const { setCollapsed } = useZustandStore()

  return (
    <header className="flex h-10 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 flex-grow">
        <SidebarTrigger
          className="-ml-1"
          onClick={() => {
            setCollapsed()
          }}
        />
        <div className="flex items-center">
          <div className="border-l h-4 mx-2 border-border" />
        </div>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={URIs.home}>首页</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            {/* todo Dynamically */}
            <BreadcrumbItem>
              <BreadcrumbPage>工作台</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="ml-auto pr-2">
        <ToggleTheme />
      </div>
    </header>
  )
}

export default Header
