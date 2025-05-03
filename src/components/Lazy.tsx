import React, {
  CSSProperties,
  LazyExoticComponent,
  startTransition,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Spin } from 'antd'

interface LazyProps {
  Component: LazyExoticComponent<React.FC> | React.FC
}

const lazyContainer: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  minHeight: '200px',
}

const lazyContent: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '2rem',
  borderRadius: '16px',
  minWidth: '280px',
  maxWidth: '90%',
  maxHeight: '60%',
}

/**
 * 延迟加载 HOC 组件
 * @author weasley
 * @example
 * <Lazy Component={Dashboard} />
 */
const Lazy: React.FC<LazyProps> = ({ Component }) => {
  const [bgColor, setBgColor] = useState<string | null>(null)
  const fallbackRef = useRef<HTMLDivElement | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(true)

  const fallback = (
    <div ref={fallbackRef} style={lazyContainer}>
      <Spin tip="加载中..." size="large">
        <div style={{ ...lazyContent, backgroundColor: bgColor ?? 'transparent' }}></div>
      </Spin>
    </div>
  )

  useEffect(() => {
    if (fallbackRef.current) {
      const parentBgColor = window.getComputedStyle(fallbackRef.current.parentElement!).backgroundColor
      if (parentBgColor !== bgColor) {
        setBgColor(parentBgColor)
      }
    }
  }, [bgColor])

  useEffect(() => {
    startTransition(() => setIsTransitioning(false))
  }, [])

  if (isTransitioning) {
    return fallback
  }

  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  )
}

export default Lazy
