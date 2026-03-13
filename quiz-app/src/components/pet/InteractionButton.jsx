import { motion } from 'framer-motion'

export default function InteractionButton({ label, onClick, icon = '🐾' }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      className="px-8 py-4 bg-white text-warmBrown border-2 border-milk rounded-2xl font-medium text-lg shadow-md hover:shadow-lg hover:bg-softPink transition-colors flex items-center justify-center gap-2 mx-auto"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </motion.button>
  )
}
