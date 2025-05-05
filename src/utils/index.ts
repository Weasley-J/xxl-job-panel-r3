/**
 * 计算相差多少天
 * @param _start 开始实践
 * @param _end 结束时间
 */
function getDiffInDays(_start: string, _end: string): number {
  const start = new Date(_start)
  const end = new Date(_end)
  // 获取两个日期的时间戳（毫秒）
  const diffInMs = end.getTime() - start.getTime()
  // 转换为天数差异
  const diffInDays = diffInMs / (1000 * 3600 * 24)
  return diffInDays | 0
}

export { getDiffInDays }
