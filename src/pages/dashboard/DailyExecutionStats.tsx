import { CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { DailyExecutionLineChart } from '@/pages/dashboard/chart/DailyExecutionLineChart.tsx'
import { ExecutionResultPieChart } from '@/pages/dashboard/chart/ExecutionResultPieChart.tsx'
import api from '@/api'
import { useEffect } from 'react'
import { ChartInfoParams } from '@/types'
import useZustandStore from '@/stores/useZustandStore.ts'

/**
 * 调度统计卡片
 * @constructor
 */
export function DailyExecutionStats() {
  const { setChartData } = useZustandStore()

  const params = {
    startDate: '2025-02-05 00:00:00',
    endDate: '2025-05-05 23:59:59',
  }

  // 异步获取图表数据
  const getCartInfo = async (params: ChartInfoParams) => {
    const { content } = await api.dashboard.getCartInfo(params)
    setChartData(content) // 异步获取到数据后设置状态
    return content
  }

  useEffect(() => {
    getCartInfo(params)
  }, [])

  return (
    <div className="rounded-xl w-full">
      <CardHeader className="flex items-center justify-between py-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <CardTitle className="text-2xl font-semibold">调度统计</CardTitle>
        </div>
      </CardHeader>
      <div className="flex gap-6 flex-col sm:flex-row pb-4">
        <div className="w-full sm:w-2/3">
          <DailyExecutionLineChart />
        </div>
        <div className="w-full sm:w-1/3">
          <ExecutionResultPieChart />
        </div>
      </div>
    </div>
  )
}
