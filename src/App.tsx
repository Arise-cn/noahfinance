import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import RootLayout from '@/app/layout'

const appRoutes = [
  {
    path: '/',
    element: <RootLayout />,
    children: routes,
  },
]

function App() {
  const element = useRoutes(appRoutes)

  return <Suspense fallback={null}>{element}</Suspense>
}

export default App
