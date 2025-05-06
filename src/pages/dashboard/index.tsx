import ScheduleReportStats from '@/pages/dashboard/children/ScheduleReportStats.tsx'
import { DailyExecutionStats } from '@/pages/dashboard/children/DailyExecutionStats.tsx'

function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ScheduleReportStats />
      <DailyExecutionStats />
    </div>
  )
}

export default Dashboard
