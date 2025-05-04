import { create } from 'zustand'
import { isDebugEnable, log } from '@/common/Logger.ts'
import { isTrue } from '@/common/booleanUtils.ts'
import storage from '@/utils/storage.ts'
import { User } from '@/types'

/**
 * This is the store for the app. implemented using Zustand library.
 */
const useZustandStore = create<{
  /* state */
  token: string
  userInfo: User.Info
  collapsed: boolean
  isDarkEnable: boolean
  activeTab: string
  /* setters */
  setToken: (token: string) => void
  setUserInfo: (userInfo: User.Info) => void
  setCollapsed: () => void
  setIsDarkEnable: () => void
  setActiveTab: (activeTab: string) => void
}>(set => ({
  /* state */
  token: '',
  userInfo: ((): User.Info => {
    const stored = storage.get('user-info') as User.Info
    return stored && typeof stored === 'object' ? stored : ({} as User.Info)
  })(),
  collapsed: isTrue(storage.get('collapsed')),
  isDarkEnable: isTrue(storage.get('enableDark')),
  activeTab: '',
  /* setters */
  setToken: (token: string) => set(() => ({ token })),
  setUserInfo: (userInfo: User.Info) => {
    set(() => ({ userInfo }))
    storage.set('user-info', userInfo)
    logUpdate(userInfo)
  },
  setCollapsed: () => {
    set(state => {
      const newValue = !state.collapsed
      storage.set('collapsed', newValue) // ✅ 保存新值
      logUpdate(newValue)
      return { collapsed: newValue }
    })
  },
  setIsDarkEnable: () => {
    set(state => {
      const nextIsDark = !state.isDarkEnable
      storage.set('enableDark', nextIsDark)
      logUpdate(nextIsDark)
      return { isDarkEnable: nextIsDark }
    })
  },
  setActiveTab: (activeTab: string) => {
    logUpdate(activeTab)
    storage.set('activeTab', activeTab)
    set(() => ({ activeTab }))
  },
}))

function logUpdate(data: any) {
  if (isDebugEnable) log.debug('Zustand meta data update:', data)
}

export default useZustandStore
