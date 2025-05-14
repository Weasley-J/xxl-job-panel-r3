import { Modal } from 'antd'
import { Button } from '@/components/ui/button'
import React from 'react'
import clsx from 'clsx'

interface ShadModalProps<T = any> {
  open: boolean
  title?: React.ReactNode
  data?: T
  onReset?: () => void
  onCancel: () => void
  onOk?: () => void
  resetText?: string
  cancelText?: string
  okText?: string
  width?: number | string
  loading?: boolean
  footer?: React.ReactNode | null
  className?: string
  destroyOnHidden?: boolean // 注意：保留 destroy，会配合 useEffect 延迟设置字段
  children: (data?: T) => React.ReactNode
}

export function ShadcnAntdModal<T = any>({
  open,
  title,
  data,
  onReset,
  onCancel,
  onOk,
  resetText = '重置',
  cancelText = '取消',
  okText = '确认',
  width = 720,
  loading = false,
  footer,
  className,
  destroyOnHidden = true,
  children,
}: ShadModalProps<T>) {
  const renderDefaultFooter = () => (
    <div className="flex justify-end gap-2 px-6 pb-4">
      {/* 重置按钮 */}
      {onReset && (
        <Button size="sm" variant="ghost" onClick={onReset} disabled={loading}>
          {resetText}
        </Button>
      )}

      {/* 取消按钮 */}
      <Button size="sm" variant="outline" onClick={onCancel} disabled={loading}>
        {cancelText}
      </Button>

      {/* 确认按钮 */}
      <Button size="sm" onClick={onOk} disabled={loading}>
        {loading ? '处理中...' : okText}
      </Button>
    </div>
  )

  return (
    <Modal
      open={open}
      title={<div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{title}</div>}
      onCancel={onCancel}
      onOk={onOk}
      footer={footer !== undefined ? footer : renderDefaultFooter()}
      confirmLoading={false}
      width={width}
      className={clsx('antd-shadcn-modal', 'rounded-md', 'dark:bg-neutral-900', className)}
      destroyOnHidden={destroyOnHidden}
    >
      <div className="px-6 pt-4">{children?.(data)}</div>
    </Modal>
  )
}
