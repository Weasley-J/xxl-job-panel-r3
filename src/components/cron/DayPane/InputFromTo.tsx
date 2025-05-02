import React from 'react'
import { InputNumber } from 'antd'

function InputFromTo(props: any) {
  const { disabled, value, onChange } = props
  let from = 1
  let to = 1
  if (!disabled) {
    ;[from, to] = value.split('-').map(v => parseInt(v, 10))
  }
  const onChangeFrom = v => onChange(`${v || 1}-${to}`)
  const onChangeTo = v => onChange(`${from}-${v || 1}`)

  return (
    <React.Fragment>
      从&nbsp;
      <InputNumber
        disabled={disabled}
        min={1}
        max={31}
        value={from}
        size="small"
        onChange={onChangeFrom}
        style={{ width: 100 }}
      />
      &nbsp;-&nbsp;
      <InputNumber
        disabled={disabled}
        min={1}
        max={31}
        value={to}
        size="small"
        onChange={onChangeTo}
        style={{ width: 100 }}
      />
      &nbsp;日，每日执行一次
    </React.Fragment>
  )
}

export default InputFromTo
