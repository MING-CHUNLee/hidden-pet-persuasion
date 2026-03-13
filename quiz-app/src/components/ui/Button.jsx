import { motion } from 'framer-motion'

export default function Button({ children, onClick, variant = 'primary', className = '' }) {
  const base = 'px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-200 active:scale-95'
  const variants = {
    primary: 'bg-milk text-white hover:bg-warmBrown shadow-md hover:shadow-lg',
    secondary: 'bg-white text-warmBrown border-2 border-milk hover:bg-softPink',
    ghost: 'bg-transparent text-warmBrown hover:bg-softPink',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  )
}
