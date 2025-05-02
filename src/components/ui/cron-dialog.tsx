import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Cron from 'react-cron-generator'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function CronDialog({ onSave }: { onSave: (cron: string) => void }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('0 0 * * *') // 默认每天执行一次

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">设置 Cron</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>定时任务设置</DialogTitle>
          <DialogDescription>请选择一个 Cron 表达式来配置定时任务的执行时间.</DialogDescription>
          <DialogDescription>{/*当前表达式: <code>{value}</code>*/}</DialogDescription>
        </DialogHeader>
        {/* code */}
        <div style={{ borderRadius: 18 }}>
          <Cron onChange={value => setValue(value)} value={value} showResultText={true} showResultCron={true} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
