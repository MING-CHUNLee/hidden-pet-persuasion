import { motion } from 'framer-motion'

export default function OptionButton({ label, text, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full p-5 bg-white rounded-2xl shadow-md hover:shadow-lg border-2 border-transparent hover:border-milk text-left transition-colors group"
    >
      <div className="flex gap-3 items-start">
        <span className="flex-shrink-0 w-8 h-8 bg-milk/20 text-warmBrown rounded-full flex items-center justify-center font-bold text-sm group-hover:bg-milk group-hover:text-white transition-colors">
          {label}
        </span>
        <span className="text-warmBrown leading-relaxed">{text}</span>
      </div>
    </motion.button>
  )
}
