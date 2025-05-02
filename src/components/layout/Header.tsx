import React from 'react'
import { ModeToggle } from '@/components/ModeToggle.tsx'

const Header: React.FC = () => {
  return (
    <header className="h-14 bg-white border-b px-4 flex items-center justify-between">
      <ModeToggle />
      <div className="font-bold">LOGO</div>
      <div className="flex items-center gap-4">
        <input type="text" placeholder="搜索" className="border rounded px-2 py-1 text-sm" />
        <span>🔔</span>
        <span>👤 用户</span>
      </div>
    </header>
  )
}

export default Header
