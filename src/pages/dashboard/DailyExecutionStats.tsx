'use client'

import { CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { DailyExecutionChart } from '@/pages/dashboard/chart/DailyExecutionChart.tsx'
import { ExecutionResultChart } from '@/pages/dashboard/chart/ExecutionResultChart.tsx'

/**
 * 调度统计卡片
 * @constructor
 */
export function DailyExecutionStats() {
  return (
    <div className="rounded-xl w-full">
      <CardHeader className="flex items-center justify-between py-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <CardTitle className="text-2xl font-semibold">调度统计</CardTitle>
        </div>
      </CardHeader>
      <div className="flex gap-6 flex-col sm:flex-row pb-4">
        <div className="w-full sm:w-2/3">
          <DailyExecutionChart />
        </div>
        <div className="w-full sm:w-1/3">
          <ExecutionResultChart />
        </div>
      </div>
    </div>
  )
}
