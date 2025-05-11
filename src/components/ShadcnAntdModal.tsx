import { Modal } from 'antd'
import { Button } from '@/components/ui/button'
import React from 'react'
import clsx from 'clsx'

interface ShadModalProps<T = any> {
  open: boolean
  title?: React.ReactNode
  data?: T
  onCancel: () => void
  onOk?: () => void
  okText?: string
  cancelText?: string
  width?: number | string
  loading?: boolean
  footer?: React.ReactNode | null
  className?: string
  destroyOnHidden?: boolean
  children: (data?: T) => React.ReactNode
}

export function ShadcnAntdModal<T = any>({
  open,
  title,
  data,
  onCancel,
  onOk,
  okText = '确认',
  cancelText = '取消',
  width = 720,
  loading = false,
  footer,
  className,
  destroyOnHidden = true,
  children,
}: ShadModalProps<T>) {
  return (
    <Modal
      open={open}
      title={<div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{title}</div>}
      onCancel={onCancel}
      onOk={onOk}
      footer={
        footer !== undefined ? (
          footer
        ) : (
          <div className="flex justify-end gap-2 px-6 pb-4">
            <Button variant="outline" onClick={onCancel}>
              {cancelText}
            </Button>
            <Button onClick={onOk} disabled={loading}>
              {loading ? '处理中...' : okText}
            </Button>
          </div>
        )
      }
      confirmLoading={false}
      width={width}
      className={clsx('antd-shadcn-modal', 'rounded-md', 'dark:bg-neutral-900', className)}
      destroyOnHidden={destroyOnHidden}
    >
      <div className="px-6 pt-4">{children?.(data)}</div>
    </Modal>
  )
}
