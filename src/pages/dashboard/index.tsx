import ScheduleReportStats from '@/pages/dashboard/ScheduleReportStats.tsx'
import { DailyExecutionStats } from './DailyExecutionStats'

function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* 总览卡片 */}
      <ScheduleReportStats />

      {/* 调度统计卡片 */}
      <DailyExecutionStats />
    </div>
  )
}

export default Dashboard
