import { CardHeader, CardTitle } from '@/components/ui/card.tsx'
import useZustandStore from '@/stores/useZustandStore.ts'
import React, { useEffect, useState } from 'react'
import api from '@/api'
import { formatNumberWithComma } from '@/utils'
import { TDashboardTaskStats } from '@/types'

function ScheduleReportStats() {
  const { isDarkEnable } = useZustandStore()
  const [data, setData] = useState<TDashboardTaskStats | null>(null)

  const cardStyle = {
    '--bg-color-1': isDarkEnable ? '#03c988' : '#ec53b0',
    '--bg-color-2': isDarkEnable ? '#1c82ad' : '#9044c0',
    '--bg-color-3': isDarkEnable ? '#00327c' : '#4c2cb7',
    '--bg-color-4': isDarkEnable ? '#120059' : '#0e20a0',
  } as React.CSSProperties

  async function getRunningOverview() {
    const { content } = await api.dashboard.getJobRunningOverview()
    setData({ code: 0, data: undefined, msg: '', content })
  }

  useEffect(() => {
    getRunningOverview()
  }, [])

  return (
    <div className="rounded-xl">
      <CardHeader className="flex items-center justify-between py-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <CardTitle className="text-2xl font-semibold">运行概览</CardTitle>
        </div>
      </CardHeader>

      <div style={cardStyle} className="grid gap-6 md:grid-cols-4 py-5 mt-4">
        {/* 任务总数 */}
        <div
          style={{ backgroundColor: 'var(--bg-color-1)' }}
          className="aspect-video rounded-xl text-white px-6 py-4 border flex items-center"
        >
          <div className="flex w-full">
            <div className="w-1/3 text-5xl flex items-center justify-center">📊</div>
            <div className="w-2/3 flex flex-col justify-center items-start text-left">
              <span className="text-base font-semibold">任务总数</span>
              <span className="text-2xl font-bold mt-1">{formatNumberWithComma(data?.content?.jobInfoCount ?? 0)}</span>
            </div>
          </div>
        </div>

        {/* 调度次数 */}
        <div
          style={{ backgroundColor: 'var(--bg-color-2)' }}
          className="aspect-video rounded-xl text-white px-6 py-4 border flex items-center"
        >
          <div className="flex w-full">
            <div className="w-1/3 text-5xl flex items-center justify-center">📅</div>
            <div className="w-2/3 flex flex-col justify-center items-start text-left">
              <span className="text-base font-semibold">总调度次数</span>
              <span className="text-2xl font-bold mt-1">{formatNumberWithComma(data?.content?.jobLogCount ?? 0)}</span>
            </div>
          </div>
        </div>

        {/* 在线执行器 */}
        <div
          style={{ backgroundColor: 'var(--bg-color-3)' }}
          className="aspect-video rounded-xl text-white px-6 py-4 border flex items-center"
        >
          <div className="flex w-full">
            <div className="w-1/3 text-5xl flex items-center justify-center">🖥️</div>
            <div className="w-2/3 flex flex-col justify-center items-start text-left">
              <span className="text-base font-semibold">在线执行器</span>
              <span className="text-2xl font-bold mt-1">
                {formatNumberWithComma(data?.content?.executorCount ?? 0)}
              </span>
            </div>
          </div>
        </div>

        {/* 成功调度 */}
        <div
          style={{ backgroundColor: 'var(--bg-color-4)' }}
          className="aspect-video rounded-xl text-white px-6 py-4 border flex items-center"
        >
          <div className="flex w-full">
            <div className="w-1/3 text-5xl flex items-center justify-center">✅</div>
            <div className="w-2/3 flex flex-col justify-center items-start text-left">
              <span className="text-base font-semibold">成功调度</span>
              <span className="text-2xl font-bold mt-1">
                {formatNumberWithComma(data?.content?.jobLogSuccessCount ?? 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleReportStats
