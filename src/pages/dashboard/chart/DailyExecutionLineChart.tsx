'use client'

import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart.tsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx'
import useZustandStore from '@/stores/useZustandStore.ts'
import { objectUtils } from '@/common/objectUtils.ts'
import { isFalse } from '@/common/booleanUtils.ts'
import { TriggerStats } from '@/types'
import api from '@/api'
import { formatDate } from 'date-fns/format'

const rawChartData = [
  { date: '2024-04-01', success: 222, running: 150 },
  { date: '2024-04-02', success: 97, running: 180 },
  { date: '2024-04-03', success: 167, running: 120 },
  { date: '2024-04-04', success: 242, running: 260 },
  { date: '2024-04-05', success: 373, running: 290 },
  { date: '2024-04-06', success: 301, running: 340 },
  { date: '2024-04-07', success: 245, running: 180 },
  { date: '2024-04-08', success: 409, running: 320 },
  { date: '2024-04-09', success: 59, running: 110 },
  { date: '2024-04-10', success: 261, running: 190 },
  { date: '2024-04-11', success: 327, running: 350 },
  { date: '2024-04-12', success: 292, running: 210 },
  { date: '2024-04-13', success: 342, running: 380 },
  { date: '2024-04-14', success: 137, running: 220 },
  { date: '2024-04-15', success: 120, running: 170 },
  { date: '2024-04-16', success: 138, running: 190 },
  { date: '2024-04-17', success: 446, running: 360 },
  { date: '2024-04-18', success: 364, running: 410 },
  { date: '2024-04-19', success: 243, running: 180 },
  { date: '2024-04-20', success: 89, running: 150 },
  { date: '2024-04-21', success: 137, running: 200 },
  { date: '2024-04-22', success: 224, running: 170 },
  { date: '2024-04-23', success: 138, running: 230 },
  { date: '2024-04-24', success: 387, running: 290 },
  { date: '2024-04-25', success: 215, running: 250 },
  { date: '2024-04-26', success: 75, running: 130 },
  { date: '2024-04-27', success: 383, running: 420 },
  { date: '2024-04-28', success: 122, running: 180 },
  { date: '2024-04-29', success: 315, running: 240 },
  { date: '2024-04-30', success: 454, running: 380 },
  { date: '2024-05-01', success: 165, running: 220 },
  { date: '2024-05-02', success: 293, running: 310 },
  { date: '2024-05-03', success: 247, running: 190 },
  { date: '2024-05-04', success: 385, running: 420 },
  { date: '2024-05-05', success: 481, running: 390 },
  { date: '2024-05-06', success: 498, running: 520 },
  { date: '2024-05-07', success: 388, running: 300 },
  { date: '2024-05-08', success: 149, running: 210 },
  { date: '2024-05-09', success: 227, running: 180 },
  { date: '2024-05-10', success: 293, running: 330 },
  { date: '2024-05-11', success: 335, running: 270 },
  { date: '2024-05-12', success: 197, running: 240 },
  { date: '2024-05-13', success: 197, running: 160 },
  { date: '2024-05-14', success: 448, running: 490 },
  { date: '2024-05-15', success: 473, running: 380 },
  { date: '2024-05-16', success: 338, running: 400 },
  { date: '2024-05-17', success: 499, running: 420 },
  { date: '2024-05-18', success: 315, running: 350 },
  { date: '2024-05-19', success: 235, running: 180 },
  { date: '2024-05-20', success: 177, running: 230 },
  { date: '2024-05-21', success: 82, running: 140 },
  { date: '2024-05-22', success: 81, running: 120 },
  { date: '2024-05-23', success: 252, running: 290 },
  { date: '2024-05-24', success: 294, running: 220 },
  { date: '2024-05-25', success: 201, running: 250 },
  { date: '2024-05-26', success: 213, running: 170 },
  { date: '2024-05-27', success: 420, running: 460 },
  { date: '2024-05-28', success: 233, running: 190 },
  { date: '2024-05-29', success: 78, running: 130 },
  { date: '2024-05-30', success: 340, running: 280 },
  { date: '2024-05-31', success: 178, running: 230 },
  { date: '2024-06-01', success: 178, running: 200 },
  { date: '2024-06-02', success: 470, running: 410 },
  { date: '2024-06-03', success: 103, running: 160 },
  { date: '2024-06-04', success: 439, running: 380 },
  { date: '2024-06-05', success: 88, running: 140 },
  { date: '2024-06-06', success: 294, running: 250 },
  { date: '2024-06-07', success: 323, running: 370 },
  { date: '2024-06-08', success: 385, running: 320 },
  { date: '2024-06-09', success: 438, running: 480 },
  { date: '2024-06-10', success: 155, running: 200 },
  { date: '2024-06-11', success: 92, running: 150 },
  { date: '2024-06-12', success: 492, running: 420 },
  { date: '2024-06-13', success: 81, running: 130 },
  { date: '2024-06-14', success: 426, running: 380 },
  { date: '2024-06-15', success: 307, running: 350 },
  { date: '2024-06-16', success: 371, running: 310 },
  { date: '2024-06-17', success: 475, running: 520 },
  { date: '2024-06-18', success: 107, running: 170 },
  { date: '2024-06-19', success: 341, running: 290 },
  { date: '2024-06-20', success: 408, running: 450 },
  { date: '2024-06-21', success: 169, running: 210 },
  { date: '2024-06-22', success: 317, running: 270 },
  { date: '2024-06-23', success: 480, running: 530 },
  { date: '2024-06-24', success: 132, running: 180 },
  { date: '2024-06-25', success: 141, running: 190 },
  { date: '2024-06-26', success: 434, running: 380 },
  { date: '2024-06-27', success: 448, running: 490 },
  { date: '2024-06-28', success: 149, running: 200 },
  { date: '2024-06-29', success: 103, running: 160 },
  { date: '2024-06-30', success: 446, running: 400 },
]

const chartConfig = {
  success: {
    label: '成功',
    color: 'hsl(var(--chart-1))',
  },
  running: {
    label: '进行中',
    color: 'hsl(var(--chart-2))',
  },
  failure: {
    label: '失败',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig

const FAILURE_RATE = 0.03
const _chartData = rawChartData.map(item => ({
  ...item,
  failure: Math.floor((item.success ?? 0) * FAILURE_RATE),
}))

export function DailyExecutionLineChart() {
  const { chartData, setChartData } = useZustandStore()
  const { setChartTimeRange } = useZustandStore()

  const [timeRange, setTimeRange] = React.useState('7d')
  const isMock = isFalse(objectUtils.hasData(chartData?.triggerDayList))

  function getFilteredMockData() {
    return _chartData.filter(item => {
      const date = new Date(item.date)
      const referenceDate = new Date()
      let daysToSubtract = 90
      if (timeRange === '30d') {
        daysToSubtract = 30
      } else if (timeRange === '7d') {
        daysToSubtract = 7
      }
      const startDate = new Date(referenceDate)
      startDate.setDate(startDate.getDate() - daysToSubtract)
      return date >= startDate
    })
  }

  function getChartDataFromApi(apiData: TriggerStats) {
    const { triggerDayList, triggerDayCountSucList, triggerDayCountRunningList, triggerDayCountFailList } = apiData
    const chartData = triggerDayList.map((date: string, index: number) => ({
      date,
      success: triggerDayCountSucList?.[index] ?? 0,
      running: triggerDayCountRunningList?.[index] ?? 0,
      failure: triggerDayCountFailList?.[index] ?? 0,
    }))
    return chartData
  }

  async function handleTimeRangeChange(timeRange: any) {
    setTimeRange(timeRange)
    const referenceDate = new Date()
    const rangeMap: Record<string, number> = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
    }
    const daysToSubtract = rangeMap[timeRange] ?? 90
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)

    const params = {
      startDate: formatDate(startDate, 'yyyy-MM-dd 00:00:00'),
      endDate: formatDate(referenceDate, 'yyyy-MM-dd 23:59:59'),
    }
    const { content } = await api.dashboard.getCartInfo(params)

    setChartTimeRange(params)
    setChartData(content)
  }

  return (
    <Card className="flex">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>每日任务执行趋势</CardTitle>
          <CardDescription>展示最近 3 个月每日任务执行情况</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={handleTimeRangeChange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="选择时间范围">
            <SelectValue placeholder="请选择时间范围" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="7d" className="rounded-lg">
              最近 7 天
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              最近 30 天
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              最近 90 天
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={isMock ? getFilteredMockData() : getChartDataFromApi(chartData)}>
            <defs>
              <linearGradient id="fillSuccess" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillRunning" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-running)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-running)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillFailure" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-failure)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-failure)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={value => {
                const date = new Date(value)
                return date.toLocaleDateString('zh-CN', {
                  month: '2-digit',
                  day: '2-digit',
                })
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={value => {
                    return new Date(value).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })
                  }}
                  indicator="dot"
                />
              }
            />

            <Area dataKey="success" type="natural" fill="url(#fillSuccess)" stroke="var(--color-success)" stackId="a" />
            <Area dataKey="running" type="natural" fill="url(#fillRunning)" stroke="var(--color-running)" stackId="a" />
            <Area dataKey="failure" type="natural" fill="url(#fillFailure)" stroke="var(--color-failure)" stackId="a" />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
