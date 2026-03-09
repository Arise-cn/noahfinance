import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'

function App() {
  const element = useRoutes(routes)

  return <Suspense fallback={null}>{element}</Suspense>
}

export default App
