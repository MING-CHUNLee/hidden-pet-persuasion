import { motion } from 'framer-motion'

export default function ProgressBar({ current, total }) {
  const progress = ((current + 1) / total) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-warmBrown/70 mb-2">
        <span>第 {current + 1} 題</span>
        <span>{current + 1} / {total}</span>
      </div>
      <div className="w-full h-2 bg-white rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-milk to-blush rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
