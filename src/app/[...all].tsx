import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * 404 / Catch-all - 对应路由 *
 */
export default function NotFoundPage() {
  return (
    <motion.div
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
      <p className="text-gray-600 mb-6">页面不存在</p>
      <Link
        to="/"
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        返回首页
      </Link>
    </motion.div>
  )
}
