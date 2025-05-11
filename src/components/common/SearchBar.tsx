import { DatePicker, Form, Input, Select } from 'antd'
import { Button } from '@/components/ui/button'
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker

export type SearchField =
  | {
      type: 'input'
      key: string
      label?: string
      placeholder?: string
      width?: number
    }
  | {
      type: 'select'
      key: string
      label?: string
      placeholder?: string
      width?: number
      options: { label: string; value: any }[]
    }
  | {
      type: 'rangePicker'
      key: string
      label?: string
      width?: number
    }

export interface SearchBarProps {
  fields: SearchField[]
  form: any
  onSearch: () => void
  onReset?: () => void
  initialValues?: Record<string, any>
}

export function SearchBar({ fields, form, initialValues, onSearch, onReset }: SearchBarProps) {
  return (
    <div className="bg-background p-4 rounded-md shadow-sm flex justify-between items-center flex-wrap gap-4 min-h-[60px] mt-2">
      {/* 左侧：搜索表单 */}
      <Form
        form={form}
        layout="inline"
        initialValues={initialValues}
        onFinish={onSearch}
        className="flex flex-wrap gap-4 items-center"
      >
        {fields.map(field => {
          const width = field.width || 200

          return (
            <Form.Item
              name={field.key}
              key={field.key}
              label={field.label}
              className="mb-0" // 清除默认 margin-bottom
            >
              {(() => {
                switch (field.type) {
                  case 'input':
                    return <Input placeholder={field.placeholder || '请输入'} style={{ width }} />
                  case 'select':
                    return (
                      <Select
                        placeholder={field.placeholder || '请选择'}
                        style={{ width }}
                        allowClear
                        options={field.options}
                      />
                    )
                  case 'rangePicker':
                    return <RangePicker style={{ width }} />
                  default:
                    return null
                }
              })()}
            </Form.Item>
          )
        })}
      </Form>

      {/* 右侧：按钮区域 */}
      <div className="flex gap-2 items-center">
        <Button onClick={() => form.submit()}>
          <SearchOutlined className="mr-1" />
          搜索
        </Button>
        <Button variant="outline" onClick={onReset}>
          <ReloadOutlined className="mr-1" />
          重置
        </Button>
      </div>
    </div>
  )
}
