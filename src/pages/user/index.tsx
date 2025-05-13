import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { PlusIcon } from '@radix-ui/react-icons'
import { DeleteIcon } from 'lucide-react'
import { Space, Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAntdTable } from 'ahooks'
import { useForm } from 'antd/es/form/Form'

import api from '@/api'
import { toast } from '@/utils/toast.ts'
import { isDebugEnable, log } from '@/common/Logger.ts'

import { SearchBar, SearchField } from '@/components/common/SearchBar.tsx'
import UserModal from '@/pages/user/UserModal.tsx'
import { useConfirmDialog } from '@/hooks/useConfirmDialog.tsx'
import { User } from '@/types'
import { IAction, ModalAction } from '@/types/modal.ts'
import { ColumnsType } from 'antd/es/table'

const INIT_VALUES: User.UserPageQuery = {
  username: '',
  role: -1,
}

/**
 * 用户管理
 */
export default function UserComponent() {
  const [form] = useForm<User.UserPageQuery>()
  const [userIds, setUserIds] = useState<number[]>([])
  const [action, setAction] = useState<IAction>('create')
  const { confirm, dialog } = useConfirmDialog()

  const currentRef = useRef<ModalAction>({
    openModal: (action, data) => {
      if (isDebugEnable) log.info('打开弹窗:', action, data)
      setAction(action)
    },
  })

  useEffect(() => {
    form.setFieldsValue(INIT_VALUES)
  }, [form])

  // 拉取数据
  const fetchTableData = async (
    { current, pageSize }: { current: number; pageSize: number },
    formData: User.UserPageQuery
  ) => {
    const res = await api.user.getUserList({ ...formData, start: current - 1, length: pageSize })
    return {
      total: res?.recordsTotal ?? 0,
      list: res?.data ?? [],
    }
  }

  //  配置分页
  const { tableProps, search } = useAntdTable(fetchTableData, {
    form,
    defaultPageSize: 10,
  })
  tableProps.pagination = {
    ...tableProps.pagination,
    showSizeChanger: true,
    showQuickJumper: false,
    showTotal: (total: any) => `共 ${total} 条`,
  }

  const handleReset = useCallback(() => {
    form.setFieldsValue(INIT_VALUES)
    search.submit()
  }, [form, search])

  const handleEdit = useCallback(
    (record: User.UserRecord) => {
      currentRef.current?.openModal('edit', record)
      search.reset()
    },
    [search]
  )

  const handleCreate = () => {
    currentRef.current?.openModal('create')
  }

  const confirmDelete = useCallback(
    (ids: number[], message: string) => {
      confirm({
        title: '确认删除操作？',
        description: message,
        onConfirm: async () => {
          await Promise.all(ids.map(id => api.user.deleteUser({ id })))
          toast.success(`${ids.length > 1 ? '批量删除成功' : '删除成功'}`)
          setUserIds([])
          handleReset()
        },
      })
    },
    [confirm, handleReset]
  )

  const handleUserDelete = (id: number) => {
    confirmDelete([id], `删除操作不可撤销，是否继续？ID: ${id}.`)
  }

  const handleBatchDelete = () => {
    if (userIds.length === 0) {
      toast.warning('请选择需要删除的用户')
      return
    }
    confirmDelete(userIds, `将删除 ${userIds.length} 个用户，操作不可恢复。`)
  }

  const searchFields = useMemo<SearchField[]>(
    () => [
      { type: 'input', key: 'username', label: '账号', placeholder: '请输入账号搜索' },
      {
        type: 'select',
        key: 'role',
        label: '角色',
        placeholder: '请选择角色',
        options: [
          { label: '全部', value: -1 },
          { label: '管理员', value: 1 },
          { label: '普通用户', value: 0 },
        ],
      },
    ],
    []
  )

  const columns = useMemo<ColumnsType<User.UserRecord>>(
    () => [
      { title: 'ID', dataIndex: 'id' },
      { title: '账号', dataIndex: 'username' },
      {
        title: '角色',
        dataIndex: 'role',
        render: (role: number) => (role === 1 ? '管理员' : role === 0 ? '普通用户' : '未知'),
      },
      {
        title: '操作',
        key: 'operate',
        render: (record: User.UserRecord) => (
          <Space>
            <Button size="sm" variant="outline" onClick={() => handleEdit(record)}>
              <EditOutlined />
              编辑
            </Button>
            <Button size="sm" variant="ghost" onClick={() => handleUserDelete(record.id)}>
              <DeleteOutlined />
              删除
            </Button>
          </Space>
        ),
      },
    ],
    [handleEdit, handleUserDelete]
  )

  return (
    <div className="content-area">
      <SearchBar
        form={form}
        initialValues={INIT_VALUES}
        fields={searchFields}
        onSearch={search.submit}
        onReset={handleReset}
      />

      <div className="content-table">
        <div className="content-table-header flex justify-between items-center px-4 py-2">
          <div className="title text-lg font-semibold">用户列表</div>
          <div className="action-btn">
            <Space>
              <Button size="sm" onClick={handleCreate}>
                <PlusIcon className="mr-1" />
                新建用户
              </Button>
              <Button size="sm" onClick={handleBatchDelete}>
                <DeleteIcon className="mr-1" />
                批量删除
              </Button>
            </Space>
          </div>
        </div>

        <Table<User.UserRecord>
          bordered
          columns={columns}
          rowKey={record => record.id}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: userIds,
            onChange: (selectedRowKeys: React.Key[]) => {
              setUserIds(selectedRowKeys as number[])
              log.info('userIds: ', selectedRowKeys)
            },
          }}
          {...tableProps}
        />
      </div>

      <UserModal parentRef={currentRef} onRefresh={() => (action === 'create' ? search.reset() : search.submit())} />

      {dialog}
    </div>
  )
}
