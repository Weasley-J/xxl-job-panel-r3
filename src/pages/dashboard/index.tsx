import React from 'react'
import { DailyExecutionStats } from '@/pages/dashboard/children/DailyExecutionStats.tsx'
import { CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { ExecutionResultChart } from '@/pages/dashboard/children/ExecutionResultChart.tsx'
import useZustandStore from '@/stores/useZustandStore.ts'

function Dashboard() {
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
    <div className="flex flex-col gap-6 p-6">
      {/* 运行报表卡片 */}
      <div className="rounded-xl">
        <CardHeader className="flex items-center justify-between py-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl font-semibold">运行报表</CardTitle>
          </div>
        </CardHeader>

        <div style={cardStyle} className="grid gap-6 md:grid-cols-3 py-5 mt-4">
          {/* 任务数量 */}
          <div
            style={{ backgroundColor: 'var(--bg-light-2)' }}
            className="aspect-video rounded-xl text-white px-6 py-4 border flex items-center"
          >
            <div className="flex w-full">
              <div className="w-1/3 text-6xl flex items-center justify-center">📦</div>
              <div className="w-2/3 flex flex-col justify-center items-start text-left">
                <span className="text-lg font-bold">任务数量</span>
                <span className="text-2xl font-bold mt-1">334,556</span>
              </div>
            </div>
          </div>

          {/* 调度次数 */}
          <div
            style={{ backgroundColor: 'var(--bg-light-3)' }}
            className="aspect-video rounded-xl text-white px-6 py-4 border flex items-center"
          >
            <div className="flex w-full">
              <div className="w-1/3 text-6xl flex items-center justify-center">🧭</div>
              <div className="w-2/3 flex flex-col justify-center items-start text-left">
                <span className="text-lg font-bold">调度次数</span>
                <span className="text-2xl font-bold mt-1">10,000</span>
              </div>
            </div>
          </div>

          {/* 执行器数量 */}
          <div
            style={{ backgroundColor: 'var(--bg-light-4)' }}
            className="aspect-video rounded-xl text-white px-6 py-4 border flex items-center"
          >
            <div className="flex w-full ">
              <div className="w-1/3 text-6xl flex items-center justify-center">🖥️</div>
              <div className="w-2/3 flex flex-col justify-center items-start text-left">
                <span className="text-lg font-bold">执行器数量</span>
                <span className="text-2xl font-bold mt-1">100,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 调度报表卡片 */}
      <div className="rounded-xl w-full">
        <CardHeader className="flex items-center justify-between py-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl font-semibold">调度报表</CardTitle>
          </div>
        </CardHeader>
        <div className="flex gap-6 flex-col sm:flex-row pb-4">
          <div className="w-full sm:w-2/3">
            <DailyExecutionStats />
          </div>
          <div className="w-full sm:w-1/3">
            <ExecutionResultChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
