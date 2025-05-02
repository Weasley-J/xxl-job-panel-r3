import { Radio } from 'antd'
import React from 'react'
import InputFromInterval from './InputFromInterval'
import InputFromTo from './InputFromTo'
import InputSpecified from './InputSpecified'

const radioStyle = { display: 'block', lineHeight: '32px' }

function MinutePane(props: any) {
  const { value, onChange } = props
  let currentRadio = 0
  if (value === '*') {
    currentRadio = 0
  } else if (value.indexOf('-') > -1) {
    currentRadio = 1
  } else if (value.indexOf('/') > -1) {
    currentRadio = 2
  } else {
    currentRadio = 3
  }

  const onChangeRadio = e => {
    const valueType = e.target.value
    const defaultValues = ['*', '0-0', '0/0', '0']
    onChange(defaultValues[valueType])
  }

  return (
    <Radio.Group style={{ width: '100%' }} value={currentRadio} onChange={onChangeRadio}>
      <Radio style={radioStyle} value={0}>
        每一分钟
      </Radio>
      <Radio style={radioStyle} value={1}>
        <InputFromTo disabled={currentRadio !== 1} value={value} onChange={onChange} />
      </Radio>
      <Radio style={radioStyle} value={2}>
        <InputFromInterval disabled={currentRadio !== 2} value={value} onChange={onChange} />
      </Radio>
      <Radio style={radioStyle} value={3}>
        <InputSpecified disabled={currentRadio !== 3} value={value} onChange={onChange} />
      </Radio>
    </Radio.Group>
  )
}

export default MinutePane
