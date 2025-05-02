import { CronDialog } from '@/components/ui/cron-dialog.tsx'
import { log } from '@/common/Logger.ts'
import CronFC from '@/components/CronFC.tsx'
import { useState } from 'react'
import Cron from 'react-cron-generator'

export default function Dashboard() {
  const [value, setValue] = useState('* * * * * ? *')

  return (
    <div>
      <h3>Dashboard</h3>
      <div>
        <Cron onChange={value => setValue(value)} value={value} showResultText={true} showResultCron={true} />
      </div>

      <CronFC
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
