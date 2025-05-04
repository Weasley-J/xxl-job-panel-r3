// components/sidebar-left.tsx
import * as React from 'react'
import { useEffect } from 'react'
import { BookOpenCheck, Clock, FileBarChart2, ListChecks, ServerCog, Users2 } from 'lucide-react'

import { NavUser } from '@/pages/user/NavUser.tsx'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

import api from '@/api'
import useZustandStore from '@/stores/useZustandStore'
import { log } from '@/common/Logger'
import { User } from '@/types'
import { NavSidebarGroupItem, NavyPrimary } from '@/components/common/NavyPrimary.tsx'
import { useNavigate } from 'react-router-dom'
import { URIs } from '@/routes'

const navMainItems: NavSidebarGroupItem[] = [
  { title: '运行报表', url: '/report', icon: FileBarChart2 },
  { title: '任务管理', url: '/tasks', icon: ListChecks },
  { title: '调度日志', url: '/logs', icon: BookOpenCheck },
  { title: '执行器管理', url: '/executors', icon: ServerCog },
  { title: '用户管理', url: '/users', icon: Users2 },
]

export function SidebarFC({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { userInfo } = useZustandStore()
  const [activeItem, setActiveItem] = React.useState<NavSidebarGroupItem>(navMainItems[0])

  const query: User.UserPageQuery = {
    start: 0,
    length: 10,
    role: -1,
    username: '',
  }

  // @ts-ignore
  async function getUserList() {
    const listResponse = await api.user.getUserList(query)
    log.info('User data:', listResponse)
  }

  useEffect(() => {
    // getUserList()
  }, [])

  const username = userInfo.username || 'user'
  const user = {
    name: username,
    email: username + '@example.com',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  }

  const navigate = useNavigate()
  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      {/* 顶部区域 */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href={URIs.home}>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Clock className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="font-semibold">{import.meta.env.VITE_APP_NAME}</span>
                  <span>{import.meta.env.VITE_APP_VERSION}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* 内容区 */}
      <SidebarContent>
        <NavyPrimary
          items={navMainItems}
          activeItem={activeItem}
          onItemClick={item => {
            log.info(item)
            setActiveItem(item)
            navigate(item.url)
          }}
        />
      </SidebarContent>

      {/* 底部区域 */}
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      {/* 收起栏 */}
      <SidebarRail />
    </Sidebar>
  )
}
