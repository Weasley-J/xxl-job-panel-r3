import { ReactNode, useImperativeHandle, useState } from 'react'
import { Button, Collapse, Form, Space, Tabs } from 'antd'
import { SwapOutlined } from '@ant-design/icons'
import { ShadcnAntdModal } from '@/components/ShadcnAntdModal.tsx'
import { IAction, IModalProps } from '@/types/modal.ts'
import { Job } from '@/types'
import { isDebugEnable, log } from '@/common/Logger.ts'
import BaseForm from '@/pages/task/children/BaseForm.tsx'
import ScheduleForm from '@/pages/task/children/ScheduleForm.tsx'
import TaskForm from '@/pages/task/children/TaskForm.tsx'
import AdvancedForm from '@/pages/task/children/AdvancedForm.tsx'
import { ScheduleTypeEnum } from '@/types/enum.ts'

const title = '任务'

const TaskModalPrimary = ({ parentRef, onRefresh }: IModalProps) => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [jobInfo, setJobInfo] = useState<Job.JobItem>({} as Job.JobItem)
  const [useTabs, setUseTabs] = useState(true)
  const scheduleType = Form.useWatch('scheduleType', form) as ScheduleTypeEnum

  const openModal = (action: IAction, data?: Job.JobItem) => {
    if (isDebugEnable) log.info('弹窗开启: ', action, data)
    setAction(action)
    setJobInfo(data || ({} as Job.JobItem))
    setOpen(true)
    form.resetFields()
  }
  // 暴露方法给父组件
  useImperativeHandle(parentRef, () => ({
    openModal,
    closeModal: () => setOpen(false),
  }))

  const tabList = [
    { key: '1', label: '基础配置' },
    { key: '2', label: '调度配置' },
    { key: '3', label: '任务配置' },
    { key: '4', label: '高级配置' },
  ]

  const contentMap: Record<string, ReactNode> = {
    '1': <BaseForm />,
    '2': <ScheduleForm scheduleType={scheduleType} />,
    '3': <TaskForm action={action} form={form} />,
    '4': <AdvancedForm />,
  }

  function handleReset() {
    return undefined
  }

  function handleOk() {
    setOpen(false)
    onRefresh()
  }

  function handleCancel() {
    setOpen(false)
  }

  function renderFormContent(useTabs = true) {
    if (useTabs) {
      return (
        <Tabs
          defaultActiveKey="1"
          centered
          tabPosition={'top'}
          items={tabList.map(tab => ({
            key: tab.key,
            label: tab.label,
            children: contentMap[tab.key],
          }))}
        />
      )
    }

    return (
      <Collapse
        defaultActiveKey={['1', '2', '3', '4']}
        items={tabList.map(tab => ({
          key: tab.key,
          label: tab.label,
          children: contentMap[tab.key],
        }))}
      />
    )
  }

  return (
    <ShadcnAntdModal<Job.JobItem>
      open={open}
      centered
      onOk={handleOk}
      onCancel={handleCancel}
      onReset={action === 'create' ? () => handleReset() : undefined}
      width={900}
      data={jobInfo}
      styles={{ body: { maxHeight: '70vh', minHeight: 460, overflowY: 'auto' } }}
      destroyOnHidden={true}
      title={
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <span>{action === 'edit' ? '编辑' + title : '新建' + title}</span>
          <Button type="text" className={'mr-4'} icon={<SwapOutlined />} onClick={() => setUseTabs(!useTabs)}>
            {useTabs ? '切换为折叠布局' : '切换为标签页布局'}
          </Button>
        </Space>
      }
    >
      {() => (
        <Form layout="vertical" form={form}>
          {renderFormContent(useTabs)}
        </Form>
      )}
    </ShadcnAntdModal>
  )
}

export default TaskModalPrimary
