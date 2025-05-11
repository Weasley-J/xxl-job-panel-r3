import React, { useCallback, useMemo, useState } from 'react'
import { DatePicker, Input, Pagination, Select, Space, Spin, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useAntdTable, useDeepCompareEffect } from 'ahooks'
import { Button } from '@/components/ui/button.tsx'
import { toast } from '@/utils/toast.ts'

const { RangePicker } = DatePicker

export type SearchConfig = {
  key: string
  label?: string
  type: 'input' | 'select' | 'dateRange'
  options?: { label: string; value: any }[]
}

interface AntdDataTableProps<T extends { id: string | number }> {
  columns: ColumnsType<T>
  fetchData: (params: { current: number; pageSize: number; [key: string]: any }) => Promise<{
    data: T[]
    total: number
  }>
  searchFields?: SearchConfig[]
  rowKey?: string | ((record: T) => string)
  actionRender?: (record: T) => React.ReactNode
  extraButtons?: React.ReactNode
  refreshKey?: any
}

export function AntdDataTable<T extends { id: string | number }>({
  columns,
  fetchData,
  searchFields = [],
  rowKey = 'id',
  actionRender,
  extraButtons,
  refreshKey,
}: AntdDataTableProps<T>) {
  const [searchParams, setSearchParams] = useState<Record<string, any>>({})

  const wrappedFetch = async ({ current, pageSize }: { current: number; pageSize: number }) => {
    try {
      const res = await fetchData({ current, pageSize, ...searchParams })
      return {
        list: res.data,
        total: res.total,
      }
    } catch (err: any) {
      toast.error(err.message || '请求失败')
      return {
        list: [],
        total: 0,
      }
    }
  }

  const { tableProps, pagination, run } = useAntdTable(wrappedFetch, {
    defaultPageSize: 10,
    manual: true,
  })

  // When searchParams or refreshKey changes, re-run the data fetch
  useDeepCompareEffect(() => {
    run({
      current: pagination.current,
      pageSize: pagination.pageSize,
    })
  }, [searchParams, refreshKey]) // Trigger data fetch whenever searchParams or refreshKey changes

  const finalColumns: ColumnsType<T> = useMemo(() => {
    const base = [...columns]
    if (actionRender) {
      base.push({
        title: '操作',
        key: 'action',
        render: (_, record) => <Space>{actionRender(record)}</Space>,
        fixed: 'right',
      })
    }
    return base
  }, [columns, actionRender])

  const handleSearchChange = useCallback((key: string, value: any) => {
    setSearchParams(prev => ({ ...prev, [key]: value }))
  }, [])

  const handleReset = useCallback(() => {
    setSearchParams({})
  }, [])

  return (
    <div className="space-y-4">
      {searchFields.length > 0 && (
        <div className="flex flex-wrap gap-4 bg-muted/30 p-4 rounded-md items-center">
          {searchFields.map(field => {
            const common = { key: field.key, style: { width: 200 } }
            switch (field.type) {
              case 'input':
                return (
                  <Input
                    {...common}
                    placeholder={field.label}
                    value={searchParams[field.key] || ''}
                    onChange={e => handleSearchChange(field.key, e.target.value)}
                  />
                )
              case 'select':
                return (
                  <Select
                    {...common}
                    placeholder={field.label}
                    value={searchParams[field.key]}
                    allowClear
                    options={field.options}
                    onChange={value => handleSearchChange(field.key, value)}
                  />
                )
              case 'dateRange':
                return (
                  <RangePicker
                    {...common}
                    value={searchParams[field.key]}
                    onChange={val => handleSearchChange(field.key, val)}
                  />
                )
              default:
                return null
            }
          })}
          <div className="ml-auto flex gap-4">
            <Space>
              <Button className="btn btn-primary" onClick={() => run({ current: 1, pageSize: pagination.pageSize })}>
                搜索
              </Button>
              <Button className="btn btn-outline" onClick={handleReset}>
                重置
              </Button>
              {extraButtons}
            </Space>
          </div>
        </div>
      )}

      <Spin spinning={tableProps.loading} size="large">
        <Table<T>
          bordered
          style={{ minHeight: 300 }}
          scroll={{ x: 'max-content' }}
          rowKey={record => (typeof rowKey === 'function' ? rowKey(record) : (record as any)[rowKey])}
          columns={finalColumns}
          locale={{
            emptyText: <div className="text-muted-foreground py-10 text-center">暂无数据</div>,
          }}
          {...tableProps}
          pagination={false}
        />
      </Spin>

      <div className="flex justify-end pb-4 mr-4">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          showSizeChanger
          showQuickJumper
          showTotal={t => `共 ${t} 条`}
          onChange={pagination.onChange}
        />
      </div>
    </div>
  )
}
