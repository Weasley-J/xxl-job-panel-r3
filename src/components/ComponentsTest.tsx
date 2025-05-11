import { AntdTextInput } from '@/components/common/AntdTextInput.tsx'
import { AntdSelectInput } from '@/components/common/AntdSelectInput.tsx'
import { AntdTreeSelectInput } from '@/components/common/AntdTreeSelectInput.tsx'
import { AntdNumberInput } from '@/components/common/AntdNumberInput.tsx'

import { AntdDataTable } from '@/components/common/AntdDataTable.tsx'
import { log } from '@/common/Logger.ts'
import { SearchBar } from '@/components/common/SearchBar.tsx'
import { Form, useForm } from 'react-hook-form'
import { AntdDatePicker } from '@/components/common/AntdDatePicker.tsx'

export default function ComponentsTest() {
  const form = useForm()
  const treeData: any[] = []

  return (
    <div>
      <SearchBar
        fields={[
          { type: 'input', key: 'username', placeholder: '账号搜索' },
          {
            type: 'select',
            key: 'status',
            placeholder: '请选择状态',
            options: [
              { label: '启用', value: 'active' },
              { label: '禁用', value: 'inactive' },
            ],
          },
          { type: 'rangePicker', key: 'dateRange' },
        ]}
        onSearch={() => {}}
        onReset={() => {}}
        initialValues={{
          keyword: '',
          status: undefined,
          dateRange: [],
        }}
        form={undefined}
      />

      <Form>
        <AntdTextInput name="username" control={form.control} label="用户名" required />
        <AntdDatePicker name="dob" control={form.control} label="出生日期" />
        <AntdSelectInput
          name="gender"
          control={form.control}
          label="性别"
          options={[
            { label: '男', value: 'male' },
            { label: '女', value: 'female' },
          ]}
        />
        <AntdTreeSelectInput name="department" control={form.control} label="部门" treeData={treeData} />
        <AntdNumberInput name="age" control={form.control} label="年龄" min={0} max={100} />
      </Form>

      <AntdDataTable
        columns={[
          { title: '用户名', dataIndex: 'name' },
          { title: '状态', dataIndex: 'status' },
          { title: '注册时间', dataIndex: 'createdAt' },
        ]}
        searchFields={[
          { key: 'keyword', label: '关键词', type: 'input' },
          {
            key: 'status',
            label: '状态',
            type: 'select',
            options: [
              { label: '启用', value: 'active' },
              { label: '禁用', value: 'inactive' },
            ],
          },
          { key: 'range', label: '日期范围', type: 'dateRange' },
        ]}
        fetchData={async params => {
          log.info('请求参数', params)
          // 模拟后端分页返回结构
          return {
            data: [
              { id: 1, name: 'Tom', status: 'active', createdAt: '2024-01-01' },
              { id: 2, name: 'Jerry', status: 'inactive', createdAt: '2024-02-01' },
            ],
            total: 2,
          }
        }}
      />
    </div>
  )
}
