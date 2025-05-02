import { Dropdown, Input } from 'antd'
import { log } from '@/common/Logger.ts'
import Cron from '@/components/cron'

export default function CronFC(props: { value: string; onChange: (newValue: string) => void }) {
  const { value, onChange } = props

  return (
    <Dropdown
      trigger={['click']}
      placement="bottomLeft"
      dropdownRender={() => (
        <Cron
          value={value}
          onOk={(newValue: string) => {
            log.info('用户选择的新 Cron 值：', newValue)
            onChange(newValue)
          }}
        />
      )}
    >
      <Input value={value} />
    </Dropdown>
  )
}
