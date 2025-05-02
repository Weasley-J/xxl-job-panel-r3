import React from 'react'
import { InputNumber } from 'antd'

function InputFromTo(props: any) {
  const { disabled, value, onChange } = props
  let from = 0
  let to = 0
  if (!disabled) {
    ;[from, to] = value.split('-').map(v => parseInt(v, 10))
  }
  const onChangeFrom = v => onChange(`${v || 0}-${to}`)
  const onChangeTo = v => onChange(`${from}-${v || 0}`)

  return (
    <React.Fragment>
      从&nbsp;
      <InputNumber
        disabled={disabled}
        min={0}
        max={59}
        value={from}
        size="small"
        onChange={onChangeFrom}
        style={{ width: 100 }}
      />
      &nbsp;-&nbsp;
      <InputNumber
        disabled={disabled}
        min={0}
        max={59}
        value={to}
        size="small"
        onChange={onChangeTo}
        style={{ width: 100 }}
      />
      &nbsp;分，每分执行一次
    </React.Fragment>
  )
}

export default InputFromTo
