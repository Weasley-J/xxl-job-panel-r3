import React from 'react'
import { InputNumber } from 'antd'

function InputFromInterval(props: any) {
  const { disabled, value, onChange } = props
  let from = 1
  let interval = 1
  if (!disabled) {
    ;[from, interval] = value.split('/').map(v => parseInt(v, 10))
  }
  const onChangeFrom = v => onChange(`${v || 1}/${interval}`)
  const onChangeInterval = v => onChange(`${from}/${v || 1}`)

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
      &nbsp;日开始， 每&nbsp;
      <InputNumber
        disabled={disabled}
        min={1}
        max={31}
        value={interval}
        size="small"
        onChange={onChangeInterval}
        style={{ width: 100 }}
      />
      &nbsp;日执行一次
    </React.Fragment>
  )
}

export default InputFromInterval
