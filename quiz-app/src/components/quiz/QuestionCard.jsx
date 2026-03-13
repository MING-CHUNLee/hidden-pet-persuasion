import { motion, AnimatePresence } from 'framer-motion'
import OptionButton from './OptionButton'

export default function QuestionCard({ question, onAnswer }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.35 }}
        className="w-full"
      >
        <div className="bg-white/50 rounded-3xl p-6 mb-6 shadow-sm">
          <span className="inline-block px-3 py-1 bg-milk/20 text-warmBrown rounded-full text-sm font-medium mb-3">
            {question.category}
          </span>
          <p className="text-warmBrown text-lg leading-relaxed">
            {question.scenario}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <OptionButton label="A" text={question.optionA} onClick={() => onAnswer('A')} />
          <OptionButton label="B" text={question.optionB} onClick={() => onAnswer('B')} />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
