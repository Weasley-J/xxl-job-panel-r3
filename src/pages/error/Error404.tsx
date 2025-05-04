import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
  const navigate = useNavigate()
  const navigateToHome = () => navigate('/')
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={
          <Button type="primary" onClick={navigateToHome}>
            返回首页
          </Button>
        }
      />
    </>
  )
}

export default PageNotFound
