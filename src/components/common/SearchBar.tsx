import { DatePicker, Form, Input, Select } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const { RangePicker } = DatePicker

export type SearchField =
  | {
  type: 'input'
  key: string
  label?: string
  placeholder?: string
}
  | {
  type: 'select'
  key: string
  label?: string
  placeholder?: string
  options: { label: string; value: any }[]
}
  | {
  type: 'rangePicker'
  key: string
  label?: string
}

export type ActionButton = {
  key: string
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  variant?: 'default' | 'outline' | 'ghost'
  submit?: boolean
}

export interface SearchBarProps {
  fields: SearchField[]
  form: any
  onSearch: () => void
  onReset?: () => void
  initialValues?: Record<string, any>
  buttons?: ActionButton[]
}

export function SearchBar({
                            fields,
                            form,
                            initialValues,
                            onSearch,
                            buttons = [],
                          }: SearchBarProps) {
  const [expand, setExpand] = useState(false)

  const renderField = (field: SearchField) => {
    return (
      <Form.Item
        name={field.key}
        label={field.label}
        className="w-full"
        style={{ marginBottom: 0 }}
      >
        {(() => {
          switch (field.type) {
            case 'input':
              return (
                <Input
                  placeholder={field.placeholder || '请输入'}
                  className="w-full"
                />
              )
            case 'select':
              return (
                <Select
                  placeholder={field.placeholder || '请选择'}
                  className="w-full"
                  allowClear
                  options={field.options}
                />
              )
            case 'rangePicker':
              return <RangePicker className="w-full" />
            default:
              return null
          }
        })()}
      </Form.Item>
    )
  }

  const renderButtons = (isExpandButtonAtEnd = false) => (
    <div
      className={`flex flex-col sm:flex-row gap-2 ${
        isExpandButtonAtEnd ? 'justify-end w-full' : ''
      }`}
    >
      <Button
        variant="ghost"
        onClick={() => setExpand(!expand)}
        className="flex items-center"
      >
        {expand ? <UpOutlined /> : <DownOutlined />}
        <span className="ml-1">{expand ? '收起' : '更多'}</span>
      </Button>
      {buttons.map((btn) => (
        <Button
          key={btn.key}
          variant={btn.variant || 'default'}
          onClick={btn.submit ? () => form.submit() : btn.onClick}
        >
          {btn.icon}
          {btn.label}
        </Button>
      ))}
    </div>
  )

  return (
    <div className="bg-background p-4 rounded-md shadow-sm mt-2">
      <Form
        form={form}
        layout="horizontal"
        initialValues={initialValues}
        onFinish={onSearch}
        className="flex flex-col"
      >
        {/* 折叠状态 */}
        {!expand && (
          <div className="flex flex-wrap gap-y-3 gap-x-4 items-end">
            {fields.slice(0, 2).map((field) => (
              <div key={field.key} className="w-full sm:w-[240px]">
                {renderField(field)}
              </div>
            ))}
            <div className="flex-1" />
            <div className="flex flex-col sm:flex-row gap-2 sm:items-end w-full sm:w-auto">
              {renderButtons()}
            </div>
          </div>
        )}

        {/* 展开状态 */}
        {expand && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {fields.map((field) => (
                <div key={field.key} className="w-full">
                  {renderField(field)}
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              {renderButtons(true)}
            </div>
          </>
        )}
      </Form>
    </div>
  )
}
