import { ThemeConfig } from 'antd/es/config-provider'
import { theme } from 'antd'
import { isTrue } from '@/common/booleanUtils.ts'
import storage from '@/utils/storage.ts'

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff', // 主色调
    colorTextBase: '#333', // 文字颜色
    // 你可以添加更多的样式，如：
    // colorSuccess: '#52c41a',
    // colorError: '#ff4d4f',
    // borderRadius: '8px',
  },
  algorithm: isTrue(storage.get('enableDark')) ? theme.darkAlgorithm : theme.defaultAlgorithm,
}
