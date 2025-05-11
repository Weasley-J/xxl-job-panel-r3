import { DatePicker, Form, Input, Select, Space } from 'antd'
import { Button } from '@/components/ui/button'
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker

export type SearchField =
  | {
      type: 'input'
      key: string
      placeholder?: string
      width?: number
    }
  | {
      type: 'select'
      key: string
      placeholder?: string
      width?: number
      options: { label: string; value: any }[]
    }
  | {
      type: 'rangePicker'
      key: string
      width?: number
    }

export interface SearchBarProps {
  fields: SearchField[]
  form: any // antd form 实例
  onSearch: () => void
  onReset?: () => void
  initialValues?: Record<string, any>
}

export function SearchBar({ fields, form, initialValues, onSearch, onReset }: SearchBarProps) {
  return (
    <Form
      form={form}
      layout="inline"
      initialValues={initialValues}
      onFinish={onSearch}
      className="bg-background p-4 rounded-md shadow-sm flex justify-between items-center flex-wrap gap-4 min-h-[60px]"
    >
      {/* 左侧：搜索项 */}
      <div className="flex flex-wrap gap-4 ml-2">
        {fields.map(field => {
          const width = field.width || 200

          switch (field.type) {
            case 'input':
              return (
                <Form.Item name={field.key} key={field.key}>
                  <Input placeholder={field.placeholder || '请输入'} style={{ width }} />
                </Form.Item>
              )
            case 'select':
              return (
                <Form.Item name={field.key} key={field.key}>
                  <Select
                    placeholder={field.placeholder || '请选择'}
                    style={{ width }}
                    allowClear
                    options={field.options}
                  />
                </Form.Item>
              )
            case 'rangePicker':
              return (
                <Form.Item name={field.key} key={field.key}>
                  <RangePicker style={{ width }} />
                </Form.Item>
              )
            default:
              return null
          }
        })}
      </div>

      {/* 右侧：按钮区域 */}
      <div className="flex gap-2">
        <Space className="mr-2">
          <Button>
            <SearchOutlined className="mr-1" />
            搜索
          </Button>
          <Button variant="outline" onClick={onReset}>
            <ReloadOutlined className="mr-1" />
            重置
          </Button>
        </Space>
      </div>
    </Form>
  )
}
