import { motion } from 'framer-motion'
import { reveal } from '../../data/results'

export default function RevealSection({ petType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="bg-white/70 rounded-3xl p-6 w-full"
    >
      <h3 className="text-lg font-bold text-warmBrown mb-3 flex items-center gap-2">
        <span>🔍</span> The Science Behind It
      </h3>

      <p className="text-warmBrown/90 leading-relaxed mb-4">
        {reveal.intro}
      </p>

      <div className="bg-cream rounded-2xl p-4 mb-4">
        <div className="flex items-start gap-2 mb-2">
          <span className="text-xl">{petType === 'dog' ? '🐕' : '🐈'}</span>
          <p className="text-warmBrown/80 text-sm leading-relaxed">
            {petType === 'dog' ? reveal.dog : reveal.cat}
          </p>
        </div>
      </div>

      <div className="bg-cream rounded-2xl p-4">
        <div className="flex items-start gap-2">
          <span className="text-xl">{petType === 'dog' ? '🐈' : '🐕'}</span>
          <p className="text-warmBrown/80 text-sm leading-relaxed">
            {petType === 'dog' ? reveal.cat : reveal.dog}
          </p>
        </div>
      </div>

      <p className="text-warmBrown/50 text-xs mt-4 leading-relaxed">
        📖 {reveal.citation}
      </p>
    </motion.div>
  )
}
