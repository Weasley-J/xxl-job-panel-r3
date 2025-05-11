import { useImperativeHandle, useState } from 'react'
import { Form, Input } from 'antd'
import { ShadcnAntdModal } from '@/components/ShadcnAntdModal'
import { isDebugEnable, log } from '@/common/Logger.ts'
import { Action, IModalProps, ModalVariables } from '@/types/modal.ts'
import { User } from '@/types'

/**
 * 创建/编辑用户弹窗
 */
export default function UserModal({ parentRef, onRefresh }: IModalProps) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  // @ts-ignore
  const [user, setUser] = useState<User.UserRecord>({} as User.UserRecord)
  const [action, setAction] = useState<Action>('create')

  // 开启当前组件的弹窗显示
  const openModal = (action: Action, data?: User.UserRecord) => {
    if (isDebugEnable) log.info('收到父组件的弹窗显示请求: ', action, JSON.stringify(data))
    if (action === 'edit' && data) {
      form.setFieldsValue(data)
    }
    setOpen(true)
    setAction(action)
  }

  // 关闭当前组件的弹窗显示
  const closeModal = () => {
    setOpen(false)
  }
  useImperativeHandle(parentRef, () => ({ openModal, closeModal })) // 暴露方法给父组件使用

  // @ts-ignore
  const handleEdit = () => {
    setOpen(true)
  }

  function handleCancel() {
    if (isDebugEnable) log.info('取消')
    setOpen(false)
  }

  function onFinish() {
    setOpen(false)
  }

  function handleOk() {
    log.info(action + '成功')
    setOpen(false)
    onRefresh() // 调用父组件的刷新函数
  }

  return (
    <div>
      <ShadcnAntdModal<User.UserRecord>
        open={open}
        onCancel={handleCancel}
        onOk={handleOk}
        title={action === 'edit' ? '编辑用户' : '新建用户'}
        data={user}
      >
        {() => (
          <Form
            {...ModalVariables.layout}
            style={{ maxWidth: 600 }}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            initialValues={{}}
          >
            <Form.Item name="userId" label="用户ID" hidden={true}>
              <Input />
            </Form.Item>
            <Form.Item
              name="userName"
              label="用户名称"
              rules={[{ required: false }, { min: 5, max: 20, message: '用户名长度必须在5到12个字符之间' }]}
            >
              <Input placeholder={'请输入用户名称'} />
            </Form.Item>
          </Form>
        )}
      </ShadcnAntdModal>
    </div>
  )
}
