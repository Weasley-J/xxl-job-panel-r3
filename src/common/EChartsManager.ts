import * as echarts from 'echarts'
import { ECharts, EChartsType } from 'echarts'
import { RefObject } from 'react'
import { isDebugEnable, log } from '@/common/Logger.ts'

export const EChartsManager = {
  /**
   * 获取 ECharts 实例，如果不存在则创建一个新实例
   * @param chartRef React 组件的 ref 对象
   * @returns ECharts 实例或 null
   */
  getInstanceIfPresent: (chartRef: RefObject<HTMLDivElement>): ECharts | null => {
    if (!chartRef.current) {
      log.warn('React 组件的 ECharts ref 对象不存在')
      return null
    }
    // 尝试获取现有的 ECharts 实例，如果不存在则创建一个新的实例
    let instance = echarts.getInstanceByDom(chartRef.current)
    if (instance && isDebugEnable) log.debug('Use exists instance of ECharts, chartId: ', instance.getId())
    if (!instance) {
      instance = echarts.init(chartRef.current)
    }
    return instance
  },

  /**
   * Resize charts
   * @param chartRefs React 组件的 ref 对象数组
   */
  resizeCharts: (...chartRefs: RefObject<HTMLDivElement>[]) => {
    chartRefs.forEach(chartRef => {
      if (chartRef?.current) {
        EChartsManager.getInstanceIfPresent(chartRef)?.resize()
      }
    })
  },

  /**
   * 销毁 ECharts 实例
   * @param instances ECharts 实例或 React ref 对象
   */
  destroy: (...instances: (EChartsType | RefObject<HTMLDivElement>)[]) => {
    instances.forEach(instance => {
      if (instance && 'dispose' in instance && typeof instance.dispose === 'function') {
        instance.dispose()
      } else {
        const instanceRef = instance as RefObject<HTMLDivElement>
        if (instanceRef.current) {
          const chartInstance = echarts.getInstanceByDom(instanceRef.current)
          if (chartInstance) {
            chartInstance.dispose()
          }
        }
      }
    })
  },

  /**
   * 定义传入回调函数的 ECharts 配置项
   * @param onRefreshCallback 刷新按钮点击回调函数
   * @returns EchartsOptionWithRefresh 类型对象
   * @example
   *      toolbox: {
   *         feature: {
   *           ...EChartsManager.getEChartsOptionWithRefresh(() => {
   *             if (isDebugEnable) log.info(`Refreshing chart`)
   *             renderVisitChart()
   *           }),
   *         },
   *       },
   */
  getEChartsOptionWithRefresh: (onRefreshCallback: () => void): EchartsOptionWithRefresh => ({
    myRefreshButton: {
      show: true,
      title: '刷新数据',
      icon: 'image://images/action_refresh_btn.png',
      onclick: onRefreshCallback,
    },
  }),
}

export interface EchartsOptionWithRefresh {
  myRefreshButton: {
    show: boolean
    title: string
    icon: string
    onclick: () => void
  }
}
