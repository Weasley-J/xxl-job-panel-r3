import { IAction, IModalProps } from '@/types/modal.ts'
import { Job } from '@/types'
import { ShadcnAntdModal } from '@/components/ShadcnAntdModal.tsx'
import { isDebugEnable, log } from '@/common/Logger.ts'
import { useEffect, useImperativeHandle, useState } from 'react'
import { Card, Col, Form, Input, Row, Select } from 'antd'
import CronEditor from '@/pages/cron/CronEditor.tsx'

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

  function handleReset() {
    setJobInfo({} as Job.JobItem)
    form.resetFields()
  }

  return (
    <ShadcnAntdModal<Job.JobItem>
      width={900}
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
      onReset={handleReset}
      title={action === 'edit' ? '编辑' + title : '新建' + title}
      data={jobInfo}
      destroyOnHidden={true}
    >
      {() => (
        <Form form={form} layout="horizontal" initialValues={{ executorFailRetryCount: 0 }}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>

          {/* —— 基础配置 —— */}
          <Card title="基础配置" variant="outlined" style={{ marginBottom: '12px' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="执行器" name="jobGroup" rules={[{ required: true }]}>
                  <Select placeholder="请选择执行器" options={[]} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="任务描述" name="jobDesc" rules={[{ required: true }]}>
                  <Input placeholder="请输入任务描述" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="负责人" name="author" rules={[{ required: true }]}>
                  <Input placeholder="请输入负责人" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="报警邮件" name="alarmEmail" rules={[{ required: true }]}>
                  <Input placeholder="请输入报警邮件，多个逗号分隔" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* —— 调度配置 —— */}
          <Card title="调度配置" variant="outlined" style={{ marginBottom: '12px' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="调度类型" name="scheduleType" rules={[{ required: true }]}>
                  <Select
                    placeholder="请选择类型"
                    options={[
                      { label: 'CRON', value: 'CRON' },
                      { label: '固定速率', value: 'FIX_RATE' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Cron" name="scheduleConf" rules={[{ required: true }]}>
                  <CronEditor onChange={() => log.info('cron')} value="" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* —— 任务配置 —— */}
          <Card title="任务配置" variant="outlined" style={{ marginBottom: '12px' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="运行模式" name="glueType" rules={[{ required: true }]}>
                  <Select
                    options={[
                      { label: 'BEAN', value: 'BEAN' },
                      { label: 'GLUE Java', value: 'GLUE_JAVA' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="JobHandler" name="executorHandler" rules={[{ required: true }]}>
                  <Input placeholder="请输入JobHandler" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="任务参数" name="executorParam" rules={[{ required: true }]}>
                  <Input.TextArea allowClear placeholder="请输入任务参数" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* —— 高级配置 —— */}
          <Card title="高级配置" variant="outlined" style={{ marginBottom: '12px' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="路由策略" name="executorRouteStrategy">
                  <Select
                    placeholder="请选择策略"
                    options={[
                      { label: '第一个', value: 'FIRST' },
                      { label: '轮询', value: 'ROUND' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="子任务ID" name="childJobId">
                  <Input placeholder="请输入子任务ID, 如存在多个则用逗号分隔" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="调度过期策略" name="misfireStrategy">
                  <Select
                    placeholder="请选择"
                    options={[
                      { label: '忽略', value: 'DO_NOTHING' },
                      { label: '立即执行', value: 'FIRE_ONCE_NOW' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="阻塞处理策略" name="executorBlockStrategy">
                  <Select
                    placeholder="请选择"
                    options={[
                      { label: '串行执行', value: 'SERIAL_EXECUTION' },
                      { label: '并行执行', value: 'CONCURRENT_EXECUTION' },
                      { label: '单机串行', value: 'SINGLE_MACHINE' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="任务超时时间" name="executorTimeout">
                  <Input placeholder="单位秒，大于零时生效" type="number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="失败重试次数" name="executorFailRetryCount">
                  <Input placeholder="失败重试次数，大于零时生效" type="number" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      )}
    </ShadcnAntdModal>
  )
}
