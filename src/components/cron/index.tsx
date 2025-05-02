import { Button, Space, Tabs } from 'antd'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React, { JSXElementConstructor, ReactElement, ReactNode, useCallback, useEffect, useState } from 'react'
import { dayRegex, hourRegex, minuteRegex, monthRegex, secondRegex, weekRegex, yearRegex } from './utils/cronRegex.ts' // 导入正则表达式模块，用于验证每个 cron 字段的合法性
import DayPane from './DayPane' // 导入不同时间字段面板组件
import HourPane from './HourPane'
import MinutePane from './MinutePane'
import MonthPane from './MonthPane'
import SecondPane from './SecondPane'
import WeekPane from './WeekPane'
import YearPane from './YearPane'
import { ICronProps } from '@/components/cron/index-conf' // 导入类型定义接口

const { TabPane } = Tabs // 使用 Tabs 组件中的 TabPane 组件

// 设置 Tab 样式
const tabPaneStyle = {
  paddingLeft: 10,
  paddingBottom: 8,
  marginTop: -10,
}

// 定义函数用于渲染 Tab 标题
const getTabTitle = (
  text:
    | string
    | number
    | bigint
    | boolean
    | ReactElement<unknown, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | null
    | undefined,
): ReactNode => <div style={{ width: 50, textAlign: 'center' }}>{text}</div>

export default function Cron(props: ICronProps) {
  // 从 props 中解构获取传入的值
  const { style, footerStyle, footerRenderer, value, onOk } = props

  // 定义当前时间字段状态
  const [currentTab, setCurrentTab] = useState('1') // 当前显示的 Tab
  const [second, setSecond] = useState('*')
  const [minute, setMinute] = useState('*')
  const [hour, setHour] = useState('*')
  const [day, setDay] = useState('*')
  const [month, setMonth] = useState('*')
  const [week, setWeek] = useState('?')
  const [year, setYear] = useState('*')

  // 解析传入的 cron 表达式
  const onParse = useCallback(() => {
    if (value) {
      const parts = value.trim().split(' ')
      if (parts.length === 7) {
        try {
          // 分别提取 cron 字段的值
          let [secondVal, minuteVal, hourVal, dayVal, monthVal, weekVal, yearVal] = parts

          // 验证并设置每个字段的值
          secondVal = secondRegex.test(secondVal) ? secondVal : '*'
          minuteVal = minuteRegex.test(minuteVal) ? minuteVal : '*'
          hourVal = hourRegex.test(hourVal) ? hourVal : '*'
          dayVal = dayRegex.test(dayVal) ? dayVal : '*'
          monthVal = monthRegex.test(monthVal) ? monthVal : '*'
          weekVal = weekRegex.test(weekVal) ? weekVal : '?'
          weekVal = dayVal !== '?' ? '?' : weekVal // 如果 day 为 ?，则 week 也为 ?
          yearVal = yearRegex.test(yearVal) ? yearVal : '*'

          // 更新状态
          setSecond(secondVal)
          setMinute(minuteVal)
          setHour(hourVal)
          setDay(dayVal)
          setMonth(monthVal)
          setWeek(weekVal)
          setYear(yearVal)
        } catch (e) {
          // 如果解析失败，回退到默认值
        }
      }
    }
  }, [value])

  // 重置 cron 设置为默认值
  const onReset = useCallback(() => {
    setSecond('*')
    setMinute('*')
    setHour('*')
    setDay('*')
    setMonth('*')
    setWeek('?')
    setYear('*')
    // 回调给父组件，返回默认的 cron 表达式
    onOk?.(['*', '*', '*', '*', '*', '?', '*'].join(' '))
  }, [onOk])

  // 生成 cron 表达式并传递给父组件
  const onGenerate = useCallback(() => {
    onOk?.([second, minute, hour, day, month, week, year].join(' '))
  }, [onOk, second, minute, hour, day, month, week, year])

  // 处理 day 字段的变化
  const onChangeDay = (v: string) => {
    setDay(v)
    if (v !== '?') setWeek('?') // 如果 day 被设置为非 ?，则将 week 设置为 ?
  }

  // 处理 week 字段的变化
  const onChangeWeek = (v: string) => {
    setWeek(v)
    if (v !== '?') setDay('?') // 如果 week 被设置为非 ?，则将 day 设置为 ?
  }

  // 当 value 改变时重新解析 cron 表达式
  useEffect(() => {
    onParse()
  }, [onParse])

  // 渲染页脚
  const footerRendererWrapper = useCallback((): ReactNode => {
    if (footerRenderer && typeof footerRenderer === 'function') {
      return footerRenderer(onReset, onGenerate) // 自定义的页脚渲染
    }
    return (
      <Space>
        <Button type={'default'} onClick={onReset}>
          重置
        </Button>
        <Button type={'primary'} onClick={onGenerate}>
          生成
        </Button>
      </Space>
    )
  }, [footerRenderer, onReset, onGenerate])

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        outline: 'none',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        width: 600,
        ...style, // 可以通过 style prop 覆盖样式
      }}
    >
      {/* Tabs 组件用于展示不同的 cron 字段面板 */}
      <Tabs
        centered
        tabPosition={'top'}
        type="line"
        destroyInactiveTabPane
        activeKey={currentTab}
        onChange={setCurrentTab} // 切换 Tab 时更新当前 Tab
      >

        {/* 每个 TabPane 对应一个时间字段面板 */}
        <TabPane tab={getTabTitle('秒')} key="1" style={tabPaneStyle}>
          <SecondPane value={second} onChange={setSecond} />
        </TabPane>
        <TabPane tab={getTabTitle('分')} key="2" style={tabPaneStyle}>
          <MinutePane value={minute} onChange={setMinute} />
        </TabPane>
        <TabPane tab={getTabTitle('时')} key="3" style={tabPaneStyle}>
          <HourPane value={hour} onChange={setHour} />
        </TabPane>
        <TabPane tab={getTabTitle('日')} key="4" style={tabPaneStyle}>
          <DayPane value={day} onChange={onChangeDay} />
        </TabPane>
        <TabPane tab={getTabTitle('月')} key="5" style={tabPaneStyle}>
          <MonthPane value={month} onChange={setMonth} />
        </TabPane>
        <TabPane tab={getTabTitle('周')} key="6" style={tabPaneStyle}>
          <WeekPane value={week} onChange={onChangeWeek} />
        </TabPane>
        <TabPane tab={getTabTitle('年')} key="7" style={tabPaneStyle}>
          <YearPane value={year} onChange={setYear} />
        </TabPane>
      </Tabs>

      {/* 页脚部分：显示重置按钮和生成按钮 */}
      <div style={{ borderTop: '1px solid #e8e8e8', padding: 10, textAlign: 'right', ...footerStyle }}>
        {footerRendererWrapper() || null}
      </div>
    </div>
  )
}
