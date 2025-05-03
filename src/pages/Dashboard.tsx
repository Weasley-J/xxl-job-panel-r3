import { CronDialog } from '@/pages/cron/CronDialog.tsx'
import CronEditor from '@/pages/cron/CronEditor.tsx'

function Dashboard() {
  return (
    <div>
      <span>这是工作台 Dashboard</span> <CronDialog onSave={() => {}} />
      <div>
        <CronEditor value={''} onChange={() => {}} />
      </div>
    </div>
  )
}

export default Dashboard
