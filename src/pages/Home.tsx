import { motion } from 'framer-motion'

function Home() {
  return (
    <motion.div
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-bold text-gray-900 mb-4"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Noah Finance
      </motion.h1>
      <motion.p
        className="text-gray-600"
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Vite + React + Tailwind CSS + Framer Motion
      </motion.p>
    </motion.div>
  )
}

export default Home
