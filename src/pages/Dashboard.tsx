import { CronDialog } from '@/components/ui/cron-dialog.tsx'
import { log } from '@/common/Logger.ts'
import CronEditor from '@/components/CronEditor.tsx'
import { useState } from 'react'

export default function Dashboard() {
  const [value, setValue] = useState('* * * * * ? *')

  return (
    <div>
      <h3>Dashboard</h3>

      <CronEditor
        value={value}
        onChange={val => {
          setValue(val)
          log.info('Cron: ', val)
        }}
      />

      <CronDialog onSave={cron => log.info('用户选择了:', cron)} />
    </div>
  )
}
