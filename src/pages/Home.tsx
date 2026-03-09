import Header from '@/components/header/Header'
import { motion } from 'framer-motion'

function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <motion.div
        className="bg-[linear-gradient(rgba(5,5,5,0.48),rgba(5,5,5,0.48)),url('/images/pg1_bg.webp')] bg-cover bg-center aspect-[5760/3840]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
      </motion.div>
    </div>
  )
}

export default Home
