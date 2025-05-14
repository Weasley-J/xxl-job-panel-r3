import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { useAntdTable } from 'ahooks'
import { SearchBar, SearchField } from '@/components/common/SearchBar.tsx'
import api from '@/api'
import TaskModal from '@/pages/task/TaskModal.tsx'
import { IAction, ModalAction } from '@/types/modal.ts'
import { Job } from '@/types'
import { useConfirmDialog } from '@/hooks/useConfirmDialog.tsx'
import { isDebugEnable, log } from '@/common/Logger.ts'
import { ColumnsType } from 'antd/es/table'
import { Space, Table } from 'antd'
import { Button } from '@/components/ui/button.tsx'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { toast } from '@/utils/toast.ts'

export default function TaskManagerComponent() {
  const [form] = useForm<Job.PageListParams>()
  const [ids, setIds] = useState<number[]>([])
  const [action, setAction] = useState<IAction>('create')
  const { confirm, dialog } = useConfirmDialog()

  const [jobGroupOptions, setJobGroupOptions] = useState<{ label: string; value: number }[]>([
    {
      label: '全部',
      value: -1,
    },
  ])

  const fetchJobGroupOptions = async () => {
    try {
      const { content } = await api.user.getUserGroupPermissions()
      log.info('用户组权限:', content)

      // 使用 map 返回新的数组
      const options = (content || []).map(({ id, title }) => ({
        label: `${title}`,
        value: id,
      }))

      // 更新状态
      setJobGroupOptions(options)
    } catch (error) {
      log.error('获取用户组权限失败:', error)
    }
  }

  const currentRef = useRef<ModalAction>({
    openModal: (action, data) => {
      if (isDebugEnable) log.info(`打开弹窗: ${action}, ${data}`)
      setAction(action)
    },
  })

  const searchFields: SearchField[] = [
    {
      type: 'select',
      key: 'jobGroup',
      label: '执行器分组',
      placeholder: '请选择执行器',
      options: [{ label: '全部', value: -1 }, ...jobGroupOptions],
    },
    {
      type: 'select',
      key: 'triggerStatus',
      label: '任务状态',
      options: [
        { label: '全部', value: -1 },
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
    {
      type: 'input',
      key: 'jobDesc',
      label: '任务描述',
      placeholder: '请输入任务描述',
    },
    {
      type: 'input',
      key: 'executorHandler',
      label: 'JobHandler 名称',
      placeholder: '请输入 JobHandler',
    },
    {
      type: 'input',
      key: 'author',
      label: '负责人',
      placeholder: '请输入负责人',
    },
  ]

  const columns: ColumnsType<Job.JobItem> = [
    { title: '任务ID', dataIndex: 'id' },
    { title: '任务描述', dataIndex: 'jobDesc' },
    {
      title: '调度类型',
      render: (record: Job.JobItem) => {
        switch (record.scheduleType) {
          case 'CRON':
            return `CRON: ${record.scheduleConf}`
          default:
            return '未知'
        }
      },
    },
    {
      title: '运行模式',
      dataIndex: 'glueType',
      render: (glueType: string) => {
        switch (glueType) {
          case 'BEAN':
            return 'BEAN'
          default:
            return '未知'
        }
      },
    },
    { title: '负责人', dataIndex: 'author' },
    {
      title: '状态',
      dataIndex: 'triggerStatus',
      render: (triggerStatus: number) => (triggerStatus === 1 ? '启用' : '禁用'),
    },
    {
      title: '操作',
      render: (record: Job.JobItem) => (
        <Space>
          <Button size="sm" variant="outline" onClick={() => handleEdit(record)}>
            <EditOutlined />
            编辑
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleDelete(record.id)}>
            <DeleteOutlined />
            删除
          </Button>
        </Space>
      ),
    },
  ]

  const fetchData = async (
    { current, pageSize }: { current: number; pageSize: number },
    formData: Job.PageListParams
  ) => {
    try {
      const res = await api.job.getJobInfoList({
        jobGroup: formData.jobGroup,
        triggerStatus: formData.triggerStatus,
        start: current - 1,
        length: pageSize,
        jobDesc: formData.jobDesc || '',
        executorHandler: formData.executorHandler || '',
        author: formData.author || '',
      })
      return {
        total: res?.recordsTotal ?? 0,
        list: res?.data ?? [],
      }
    } catch (error) {
      log.error('加载任务列表失败:', error)
      return {
        total: 0,
        list: [],
      }
    }
  }

  const { tableProps, search } = useAntdTable(fetchData, {
    form,
    defaultPageSize: 10,
  })
  tableProps.pagination = {
    ...tableProps.pagination,
    showSizeChanger: true,
    showQuickJumper: false,
    showTotal: (total: any) => `共 ${total} 条`,
  }

  const handleReset = () => {
    if (isDebugEnable) log.debug('handle-reset')
    form.resetFields()
    search.reset()
  }

  function handleEdit(record: Job.JobItem) {
    currentRef?.current.openModal('edit', record)
  }

  function handleDelete(id: number) {
    if (isDebugEnable) log.info('delete:', id)
    confirmDelete([id], `删除操作不可撤销，是否继续？ID: ${id}.`)
  }

  const confirmDelete = useCallback(
    (ids: number[], message: string) => {
      confirm({
        title: '确认删除操作？',
        description: message,
        onConfirm: async () => {
          await Promise.all(ids.map(id => api.job.deleteJob(id)))
          toast.success(`${ids.length > 1 ? '批量删除成功' : '删除成功'}`)
          setIds([])
        },
      })
    },
    [confirm]
  )

  useEffect(() => {
    fetchJobGroupOptions()
  }, [])

  // 使用 number 类型
  const initialValues = {
    jobGroup: -1,
    triggerStatus: -1,
    jobDesc: '',
    executorHandler: '',
    author: '',
  }

  return (
    <div className="content-area">
      <SearchBar
        form={form}
        fields={searchFields}
        initialValues={initialValues}
        onSearch={search.submit}
        onReset={handleReset}
      />

      <div className="mt-4">
        <Table<Job.JobItem>
          bordered
          columns={columns}
          rowKey={record => record.id}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: ids,
            onChange: (selectedRowKeys: React.Key[]) => {
              setIds(selectedRowKeys as number[])
              log.info('ids: ', selectedRowKeys)
            },
          }}
          {...tableProps}
        />
      </div>

      <TaskModal parentRef={currentRef} onRefresh={() => (action === 'create' ? search.reset() : search.submit())} />

      {dialog}
    </div>
  )
}
