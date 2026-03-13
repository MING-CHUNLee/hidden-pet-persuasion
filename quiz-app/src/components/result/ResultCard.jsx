import { motion } from 'framer-motion'

export default function ResultCard({ result }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="bg-white rounded-3xl p-8 shadow-lg text-center w-full"
    >
      <motion.div
        className="text-6xl mb-4"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {result.emoji}
      </motion.div>
      <h2 className="text-2xl font-bold text-warmBrown mb-4">
        你是⋯⋯{result.type}！
      </h2>
      <p className="text-warmBrown/80 leading-relaxed mb-4">
        {result.description}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {result.traits.map((trait) => (
          <span
            key={trait}
            className="px-3 py-1 bg-milk/15 text-warmBrown rounded-full text-sm"
          >
            {trait}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
