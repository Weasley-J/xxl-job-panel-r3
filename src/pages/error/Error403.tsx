import { useNavigate } from 'react-router-dom'

export default function Error403() {
  const navigate = useNavigate()
  // @ts-ignore
  const navigateToHome = () => navigate('/')
  return (
    <>
      <div>抱歉，您没有访问此页面的权限。</div>
    </>
  )
}
