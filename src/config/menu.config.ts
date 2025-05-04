import { NavSidebarGroupItem } from '@/components/layout/NavyPrimary.tsx'
import { BookOpenCheck, ListChecks, ServerCog, Users2 } from 'lucide-react'

export interface MenuItem {
  name: string
  path: string
  icon?: string // 可选：图标组件名
  children?: MenuItem[]
}

const menuConfig: MenuItem[] = [
  { name: '首页', path: '/' },
  {
    name: '系统管理',
    path: '/system',
    children: [
      { name: '用户管理', path: '/system/users' },
      { name: '权限管理', path: '/system/permissions' },
      { name: '角色管理', path: '/system/roles' },
    ],
  },
  { name: '任务管理', path: '/tasks' },
  { name: '调度中心', path: '/scheduling' },
  { name: '报表中心', path: '/reports' },
  { name: '系统设置', path: '/settings' },
  { name: '系统监控', path: '/monitoring' },
  { name: '系统日志', path: '/logs' },
  { name: '系统工具', path: '/tools' },
]

const navMainItems: NavSidebarGroupItem[] = [
  { title: '任务管理', url: '/tasks', icon: ListChecks },
  { title: '调度日志', url: '/logs', icon: BookOpenCheck },
  { title: '执行器管理', url: '/executors', icon: ServerCog },
  { title: '用户管理', url: '/users', icon: Users2 },
]

export { navMainItems, menuConfig }
