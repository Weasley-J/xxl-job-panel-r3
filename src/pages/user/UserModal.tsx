import { useImperativeHandle, useState } from 'react'
import { Checkbox, Col, Form, Input, Radio, Row } from 'antd'
import { ShadcnAntdModal } from '@/components/ShadcnAntdModal'
import { isDebugEnable, log } from '@/common/Logger'
import { IAction, IModalProps } from '@/types/modal'
import { Job, User } from '@/types'
import api from '@/api'
import { toast } from '@/utils/toast.ts'
import { formatPermissionToList, formatPermissionToString } from '@/utils'

/**
 * 编辑|新增用户
 */
export default function UserModal({ parentRef, onRefresh }: IModalProps) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<User.UserRecord>({} as User.UserRecord)
  const [action, setAction] = useState<IAction>('create')
  const [jobGroup, setJobGroup] = useState<Job.JobGroupInfo[]>([])

  const getUserGroupPermissions = async () => {
    const { content } = await api.user.getUserGroupPermissions()
    log.info('用户组权限:', content)
    setJobGroup(content)
  }

  const openModal = (action: IAction, data?: User.UserRecord) => {
    if (isDebugEnable) log.info('弹窗开启: ', action, data)
    form.resetFields()
    if (action === 'edit' && data) {
      data.permission = formatPermissionToList(data?.permission as string)
      form.setFieldsValue(data)
      setUser(data)
    } else {
      setUser({} as User.UserRecord)
    }
    setAction(action)
    setOpen(true)
    getUserGroupPermissions()
  }

  useImperativeHandle(parentRef, () => ({ openModal, closeModal: () => setOpen(false) }))

  const handleOk = () => {
    log.info(`${action} 成功`)
    if (action === 'create') {
      handleCreate(form.getFieldsValue())
    } else {
      handleEdit(form.getFieldsValue())
    }
    setOpen(false)
    onRefresh()
  }

  const handleCancel = () => {
    if (isDebugEnable) log.info('取消编辑')
    setOpen(false)
  }

  const onFinish = () => {
    setOpen(false)
  }

  async function handleEdit(data: User.UserRecord) {
    if (isDebugEnable) log.info('编辑用户： ', data)
    data.permission = formatPermissionToString(data.permission as number[])
    const { code } = await api.user.editUser(data)
    if (code === 200) {
      toast.success('success')
    } else {
      toast.error('error')
    }
  }

  async function handleCreate(data: User.UserRecord) {
    data.permission = formatPermissionToString(data.permission as unknown as number[])
    if (isDebugEnable) log.info('创建用户: ', data)
    const { code } = await api.user.createUser(data)
    if (code === 200) {
      toast.success('success')
    } else {
      toast.error('error')
    }
  }

  const roleValue = Form.useWatch('role', form)

  return (
    <ShadcnAntdModal<User.UserRecord>
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
      title={action === 'edit' ? '编辑用户' : '新建用户'}
      data={user}
    >
      {() => (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ role: 0 }}
          className="space-y-5 max-w-2xl"
        >
          <Form.Item name="id" hidden>
            <Input placeholder="ID" />
          </Form.Item>

          <Form.Item
            name="username"
            label="账号"
            rules={[
              { required: true, message: '请输入账号' },
              { min: 4, max: 20 },
            ]}
          >
            <Input placeholder="请输入账号" />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              ...(action === 'create' ? [{ required: true, message: '请输入密码' }] : []), // 编辑时不强制
              { min: 5, max: 20 },
            ]}
          >
            <Input.Password placeholder={action === 'create' ? '请输入密码' : '如需修改请填写'} />
          </Form.Item>

          <Form.Item name="role" label="角色" rules={[{ required: true }]}>
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={1}>管理员</Radio.Button>
              <Radio.Button value={0}>普通用户</Radio.Button>
            </Radio.Group>
          </Form.Item>

          {roleValue === 0 && (
            <Form.Item name="permission" label="权限">
              <Checkbox.Group className="w-full">
                <Row gutter={[12, 12]}>
                  {jobGroup.map(item => (
                    <Col span={6} key={item.id}>
                      <Checkbox value={item.id}>
                        <div className="break-words">
                          {item.title}
                          <br />
                          <span className="text-xs text-gray-500">{item.appname}</span>
                        </div>
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          )}
        </Form>
      )}
    </ShadcnAntdModal>
  )
}
