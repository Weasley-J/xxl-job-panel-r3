import { IAction, IModalProps } from '@/types/modal.ts'
import { Job } from '@/types'
import { ShadcnAntdModal } from '@/components/ShadcnAntdModal.tsx'
import { isDebugEnable, log } from '@/common/Logger.ts'
import { useEffect, useImperativeHandle, useState } from 'react'
import { Form, Input } from 'antd'

const title = '任务'

export default function TaskModal({ parentRef, onRefresh }: IModalProps) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [jobInfo, setJobInfo] = useState<Job.JobItem>({} as Job.JobItem)

  // 暴露方法给父组件
  useImperativeHandle(parentRef, () => ({
    openModal,
    closeModal: () => setOpen(false),
  }))

  const openModal = (action: IAction, data?: Job.JobItem) => {
    if (isDebugEnable) log.info('弹窗开启: ', action, data)
    setAction(action)
    setJobInfo(data || ({} as Job.JobItem)) // 保存数据用于延迟设值
    setOpen(true)
    form.resetFields() // 先重置，避免残留
  }

  // 🔄 延迟设置字段，确保 Form 已挂载
  useEffect(() => {
    if (open && action === 'edit' && jobInfo?.id) {
      setTimeout(() => {
        form.setFieldsValue(jobInfo)
      }, 5)
    }
  }, [open, action, jobInfo, form])

  const handleCancel = () => {
    if (isDebugEnable) log.info('取消编辑')
    setOpen(false)
  }

  const handleOk = () => {
    const fieldsValue = form.getFieldsValue()
    log.info(`操作: ${action} :`, fieldsValue)

    if (action === 'create') {
      handleCreate(fieldsValue)
    } else {
      handleEdit(fieldsValue)
    }

    setOpen(false)
    onRefresh()

    function handleCreate(values: any) {
      if (isDebugEnable) log.info(`handle-create: ${values} :`, fieldsValue)
    }

    function handleEdit(values: any) {
      if (isDebugEnable) log.info(`handle-edit: ${values} :`, fieldsValue)
    }
  }

  return (
    <ShadcnAntdModal<Job.JobItem>
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
      title={action === 'edit' ? '编辑' + title : '新建' + title}
      data={jobInfo}
      destroyOnHidden={true} // 注意：保留 destroy，会配合 useEffect 延迟设置字段
    >
      {() => (
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ role: 0 }}
          className="space-y-5"
        >
          <Form.Item name="id" hidden>
            <Input placeholder="JOB ID" />
          </Form.Item>
          <Form.Item name="author">
            <Input placeholder="请输入负责人" />
          </Form.Item>
        </Form>
      )}
    </ShadcnAntdModal>
  )
}
