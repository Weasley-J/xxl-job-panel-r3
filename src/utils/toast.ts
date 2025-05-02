import { toast as sonnerToast } from 'sonner'
import { message as antdMsg } from 'antd'

export const toast = {
  success: (msg: string, useAntd?: boolean) => {
    if (useAntd) {
      antdMsg.success(msg)
    } else {
      sonnerToast.success(msg)
    }
  },
}
