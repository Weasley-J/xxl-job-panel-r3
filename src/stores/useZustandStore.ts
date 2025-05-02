import { create } from 'zustand'
import { isDebugEnable, log } from '@/common/Logger.ts'
import { isTrue } from '@/common/booleanUtils.ts'
import storage from '@/utils/storage.ts'

/**
 * This is the store for the app. implemented using Zustand library.
 */
const useZustandStore = create<{
  /* state */
  token: string
  collapsed: boolean
  isDarkEnable: boolean
  activeTab: string
  /* setters */
  setToken: (token: string) => void
  setCollapsed: () => void
  setIsDarkEnable: () => void
  setActiveTab: (activeTab: string) => void
}>(set => ({
  /* state */
  token: '',
  collapsed: false,
  isDarkEnable: isTrue(storage.get('enableDark')),
  activeTab: '',
  /* setters */
  setToken: (token: string) => set(() => ({ token })),
  setCollapsed: () => {
    set(state => {
      const collapsed = state.collapsed
      logUpdate(collapsed)
      return { collapsed: !collapsed }
    })
  },
  setIsDarkEnable: () => {
    set(state => {
      const enable = !state.isDarkEnable
      logUpdate(enable)
      storage.set('enableDark', enable)
      return { isDarkEnable: enable }
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
