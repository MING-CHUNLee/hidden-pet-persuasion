import { motion } from 'framer-motion'

const pageVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
}

export default function PageContainer({ children, className = '' }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className={`max-w-lg mx-auto w-full min-h-[100dvh] px-6 py-8 flex flex-col items-center ${className}`}
    >
      {children}
    </motion.div>
  )
}
