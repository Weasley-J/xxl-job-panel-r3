import React, { useMemo, useState } from 'react'
import { Checkbox, Col, Row, Select } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { Button } from '@/components/ui/button.tsx'
import { log } from '@/common/Logger.ts'
import { ResetIcon } from '@radix-ui/react-icons'

export interface OptionType {
  label: string
  value: string | number
}

export interface ISelectWithCheckboxProps<T extends Record<string, any> = OptionType> {
  value?: T['value'][] // 用于 Form.Item 自动绑定
  onChange?: (value: T['value'][]) => void
  options: T[]
  placeholder?: string
  labelKey?: keyof T
  valueKey?: keyof T
}

export default function SelectWithCheckbox<T extends Record<string, any> = OptionType>({
  value = [],
  onChange,
  options,
  placeholder = '请选择',
  labelKey = 'label',
  valueKey = 'value',
}: ISelectWithCheckboxProps<T>) {
  log.info('SelectWithCheckbox', JSON.stringify(value))
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // 筛选项（自定义搜索逻辑）
  const filteredOptions = useMemo(() => {
    return options.filter(opt =>
      String(opt[labelKey] ?? '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, options, labelKey])

  const updateValue = (newValue: T[keyof T][]) => {
    onChange?.(newValue as T['value'][])
  }

  const handleSelectAll = () => {
    updateValue(filteredOptions.map(opt => opt[valueKey]) as T['value'][])
  }

  const handleClearAll = () => {
    updateValue([])
  }

  // 自定义下拉内容（含复选框）
  const CustomDropdown = () => {
    const allSelected = value.length === filteredOptions.length && filteredOptions.length > 0
    const isIndeterminate = value.length > 0 && value.length < filteredOptions.length

    return (
      <div
        style={{
          padding: 8,
          maxHeight: 350,
          overflowY: 'auto',
          border: '1px solid #eee',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 14, color: '#888' }}>
            <Checkbox
              style={{ fontSize: 16, fontWeight: 500, marginRight: 4 }}
              indeterminate={isIndeterminate}
              checked={allSelected}
              onChange={e => {
                if (e.target.checked) {
                  handleSelectAll()
                } else {
                  handleClearAll()
                }
              }}
            >
              全选
            </Checkbox>
            已选择 {value.length} 项 / 共 {options.length} 项
          </div>
          <Button size="sm" style={{ marginRight: 4 }} onClick={handleClearAll}>
            <ResetIcon />
            删除
          </Button>
        </div>

        <Checkbox.Group value={value} onChange={updateValue}>
          <Row gutter={[8, 8]}>
            {filteredOptions.map(item => (
              <Col span={6} key={String(item[valueKey])}>
                <Checkbox value={item[valueKey]}>{item[labelKey] as string}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </div>
    )
  }

  return (
    <Select
      mode="multiple"
      value={value}
      open={open}
      onOpenChange={setOpen}
      popupRender={CustomDropdown}
      style={{ width: '100%' }}
      placeholder={placeholder}
      onSearch={setSearchTerm}
      filterOption={false}
      tagRender={({ value: tagValue }) => {
        const currentItem = options.find(opt => opt[valueKey] === tagValue)
        if (!currentItem) return <span />

        const handleClose = (e: React.MouseEvent) => {
          e.preventDefault()
          const newVal = value.filter(v => v !== tagValue)
          onChange?.(newVal as T['value'][])
        }

        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '2px 6px',
              border: '1px solid #d9d9d9',
              borderRadius: 4,
              marginRight: 4,
            }}
          >
            {currentItem[labelKey] as string}
            <CloseOutlined style={{ marginLeft: 4, fontSize: 10, cursor: 'pointer' }} onClick={handleClose} />
          </span>
        )
      }}
      options={filteredOptions.map(opt => ({
        label: opt[labelKey],
        value: opt[valueKey],
      }))}
      maxTagCount={undefined}
    />
  )
}
