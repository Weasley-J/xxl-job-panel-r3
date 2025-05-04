'use client'

import { TrendingUp } from 'lucide-react'
import { LabelList, Pie, PieChart } from 'recharts'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

// 图表数据：状态与任务数
const chartData = [
  { status: 'success', tasks: 320, fill: 'var(--color-success)' },
  { status: 'failed', tasks: 180, fill: 'var(--color-failed)' },
  { status: 'retrying', tasks: 95, fill: 'var(--color-retrying)' },
  { status: 'terminated', tasks: 60, fill: 'var(--color-terminated)' },
  { status: 'other', tasks: 30, fill: 'var(--color-other)' },
]

// 图表配置：标签翻译及颜色
const chartConfig = {
  tasks: {
    label: '任务数',
  },
  success: {
    label: '成功',
    color: 'hsl(var(--chart-1))',
  },
  failed: {
    label: '失败',
    color: 'hsl(var(--chart-2))',
  },
  retrying: {
    label: '重试中',
    color: 'hsl(var(--chart-3))',
  },
  terminated: {
    label: '已终止',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: '其他',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig

export function ExecutionResultChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>任务状态分布</CardTitle>
        <CardDescription>2024年1月至6月</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="tasks" hideLabel />} />
            <Pie data={chartData} dataKey="tasks">
              <LabelList
                dataKey="status"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          本月上升了 5.2% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">显示最近 6 个月的任务数量</div>
      </CardFooter>
    </Card>
  )
}
