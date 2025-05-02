import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import menuConfig from '@/config/menu.config'

const Sidebar: React.FC = () => {
  const location = useLocation()

  // @ts-ignore
  const renderMenu = (menus: typeof menuConfig, parentPath = '') =>
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
    <aside className="w-60 bg-white border-r h-full overflow-auto">
      <div className="p-4 font-bold text-lg">菜单</div>
      <nav>{renderMenu(menuConfig)}</nav>
    </aside>
  )
}

export default Sidebar
