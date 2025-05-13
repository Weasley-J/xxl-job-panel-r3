import TaskModal from '@/pages/task/TaskModal.tsx'
import { useForm } from 'antd/es/form/Form'
import { Job, User } from '@/types'
import { useEffect, useMemo, useRef, useState } from 'react'
import { IAction, ModalAction } from '@/types/modal.ts'
import { useConfirmDialog } from '@/hooks/useConfirmDialog.tsx'
import { isDebugEnable, log } from '@/common/Logger.ts'
import { Button } from '@/components/ui/button.tsx'
import { SearchBar, SearchField } from '@/components/common/SearchBar.tsx'
import api from '@/api'
import { useAntdTable } from 'ahooks'

const INIT_VALUES: Job.PageListParams = {
  start: 0,
  length: 10,
  author: '',
  executorHandler: '',
  jobDesc: '',
  jobGroup: 0,
  triggerStatus: -1,
}

export default function TaskManagerComponent() {
  const [form] = useForm<User.UserPageQuery>()
  const [action, setAction] = useState<IAction>('create')
  const { confirm, dialog } = useConfirmDialog()

  const currentRef = useRef<ModalAction>({
    openModal: (action, data) => {
      if (isDebugEnable) log.info('打开弹窗:', action, data)
      setAction(action)
    },
  })

  const searchFields = useMemo<SearchField[]>(
    () => [
      {
        type: 'select',
        key: 'jobGroup',
        label: '执行器',
        width: 220,
        placeholder: '请选择执行器',
        options: [
          { label: '全部', value: -1 },
          { label: '管理员', value: 1 },
          { label: '普通用户', value: 0 },
        ],
      },
      {
        type: 'select',
        key: 'triggerStatus',
        label: '状态',
        width: 120,
        options: [
          { label: '全部', value: -1 },
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
      },
      { type: 'input', key: 'jobDesc', placeholder: '请输入任务描述' },
      { type: 'input', key: 'executorHandler', placeholder: '请输入JobHandler' },
      { type: 'input', key: 'author', placeholder: '请输入负责人' },
    ],
    []
  )

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

  function handleEdit(record: Job.JobItem) {}

  function handleUserDelete(id: number) {}

  function onRefresh() {}

  function handleReset() {}

  function handleSearch() {}

  return (
    <div className={'content-area'}>
      <SearchBar
        fields={[
          { type: 'input', key: 'name', label: '姓名' },
          {
            type: 'select',
            key: 'gender',
            label: '性别',
            options: [
              { label: '男', value: 'M' },
              { label: '女', value: 'F' },
            ],
          },
          { type: 'rangePicker', key: 'dateRange', label: '日期范围' },
        ]}
        form={form}
        onSearch={handleSearch}
        buttons={[
          { key: 'search', label: '查询', submit: true },
          { key: 'reset', label: '重置', onClick: handleReset, variant: 'outline' },
        ]}
        collapsedCount={2}
      />

      <SearchBar
        form={form}
        initialValues={INIT_VALUES}
        fields={searchFields}
        onSearch={search.submit}
        onReset={handleReset}
        buttons={[
          {
            key: 'search',
            label: '搜索',
            submit: true,
          },
          {
            key: 'reset',
            label: '重置',
            variant: 'outline',
            onClick: () => form.resetFields(),
          },
        ]}
      />
      <div className="content-table"></div>
      <Button onClick={() => currentRef?.current.openModal('create')}>编辑</Button>
      <TaskModal parentRef={currentRef} onRefresh={onRefresh} />
    </div>
  )
}
