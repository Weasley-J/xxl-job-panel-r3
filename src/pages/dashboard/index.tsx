import DailyExecutionStats from '@/pages/dashboard/DailyExecutionStats.tsx'
import ScheduleReportStats from '@/pages/dashboard/ScheduleReportStats.tsx'

function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ScheduleReportStats />
      <DailyExecutionStats />
    </div>
  )
}

export default Dashboard
