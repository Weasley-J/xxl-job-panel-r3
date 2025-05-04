import { CardHeader, CardTitle } from '@/components/ui/card.tsx'
import useZustandStore from '@/stores/useZustandStore.ts'
import React from 'react'

/**
 * 运行统计卡片
 * @constructor
 */
function ScheduleReportStats() {
  const { isDarkEnable } = useZustandStore()

  const cardStyle = {
    '--bg-dark-2': isDarkEnable ? '#03c988' : '#ec53b0',
    '--bg-dark-3': isDarkEnable ? '#1c82ad' : '#9044c0',
    '--bg-dark-4': isDarkEnable ? '#00327c' : '#4c2cb7',
    '--bg-light-2': isDarkEnable ? '#ec53b0' : '#03c988',
    '--bg-light-3': isDarkEnable ? '#9044c0' : '#1c82ad',
    '--bg-light-4': isDarkEnable ? '#4c2cb7' : '#00327c',
  } as React.CSSProperties

  return (
    <div className="rounded-xl">
      <CardHeader className="flex items-center justify-between py-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <CardTitle className="text-2xl font-semibold">运行概览</CardTitle>
        </div>
      </CardHeader>

      <div style={cardStyle} className="grid gap-6 md:grid-cols-3 py-5 mt-4">
        {/* 任务总数 */}
        <div
          style={{ backgroundColor: 'var(--bg-light-2)' }}
          className="aspect-video rounded-xl text-white px-6 py-4 border flex items-center"
        >
          <div className="flex w-full">
            <div className="w-1/3 text-6xl flex items-center justify-center">📊</div>
            <div className="w-2/3 flex flex-col justify-center items-start text-left">
              <span className="text-lg font-bold">任务总数</span>
              <span className="text-2xl font-bold mt-1">334,556</span>
            </div>
          </div>
        </div>

        {/* 调度总次数 */}
        <div
          style={{ backgroundColor: 'var(--bg-light-3)' }}
          className="aspect-video rounded-xl text-white px-6 py-4 border flex items-center"
        >
          <div className="flex w-full">
            <div className="w-1/3 text-6xl flex items-center justify-center">📅</div>
            <div className="w-2/3 flex flex-col justify-center items-start text-left">
              <span className="text-lg font-bold">调度总次数</span>
              <span className="text-2xl font-bold mt-1">10,000</span>
            </div>
          </div>
        </div>

        {/* 在线执行器 */}
        <div
          style={{ backgroundColor: 'var(--bg-light-4)' }}
          className="aspect-video rounded-xl text-white px-6 py-4 border flex items-center"
        >
          <div className="flex w-full ">
            <div className="w-1/3 text-6xl flex items-center justify-center">🖥️</div>
            <div className="w-2/3 flex flex-col justify-center items-start text-left">
              <span className="text-lg font-bold">在线执行器</span>
              <span className="text-2xl font-bold mt-1">100,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleReportStats
