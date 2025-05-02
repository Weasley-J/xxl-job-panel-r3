import React from 'react'
import WeekSelect from './WeekSelect'

function InputFromTo(props: any) {
  const { disabled, value, onChange } = props
  let from = 'SUN'
  let to = 'MON'
  if (!disabled) {
    ;[from, to] = value.split('-')
  }
  const onChangeFrom = v => onChange(`${v || 'SUN'}-${to}`)
  const onChangeTo = v => onChange(`${from}-${v || 'MON'}`)

  return (
    <React.Fragment>
      从&nbsp;
      <WeekSelect disabled={disabled} value={from} size="small" onChange={onChangeFrom} style={{ width: 100 }} />
      &nbsp;-&nbsp;
      <WeekSelect disabled={disabled} value={to} size="small" onChange={onChangeTo} style={{ width: 100 }} />
      &nbsp;，每星期执行一次
    </React.Fragment>
  )
}

export default InputFromTo
