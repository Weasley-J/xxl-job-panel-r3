import ScheduleReportStats from '@/pages/dashboard/ScheduleReportStats.tsx'
import { DailyExecutionStats } from './DailyExecutionStats'

function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ScheduleReportStats />
      <DailyExecutionStats />
    </div>
  )
}

export default Dashboard
