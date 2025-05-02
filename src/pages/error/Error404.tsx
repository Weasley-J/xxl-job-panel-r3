import { useNavigate } from 'react-router-dom'

function PageNotFound() {
  const navigate = useNavigate()
  // @ts-ignore
  const navigateToHome = () => navigate('/')
  return (
    <>
      <div>抱歉，您访问的页面不存在。</div>
    </>
  )
}

export default PageNotFound
