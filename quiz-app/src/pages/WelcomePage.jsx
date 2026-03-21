import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageContainer from '../components/layout/PageContainer'
import Button from '../components/ui/Button'
import FadeIn from '../components/ui/FadeIn'
import { useQuiz } from '../hooks/useQuiz'

export default function WelcomePage() {
  const navigate = useNavigate()
  const { reset } = useQuiz()

  const handleStart = () => {
    reset()
    navigate('/nickname')
  }

  return (
    <PageContainer className="justify-center text-center">
      {/* Floating decorative elements */}
      <motion.div
        className="text-5xl mb-2"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      >
        🛍️
      </motion.div>

      <FadeIn>
        <h1 className="text-3xl sm:text-4xl font-bold text-warmBrown mb-4 leading-tight">
          The Hidden Consumer Traits Quiz
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="text-warmBrown/70 text-lg leading-relaxed mb-2">
          Have you ever wondered if a seemingly unrelated interaction
        </p>
        <p className="text-warmBrown/70 text-lg leading-relaxed mb-8">
          could quietly alter your shopping decisions?
        </p>
      </FadeIn>

      <FadeIn delay={0.4}>
        <div className="bg-white/60 rounded-2xl p-5 mb-8 max-w-sm">
          <p className="text-warmBrown/60 text-sm leading-relaxed">
            This is a short interactive quiz that takes just 2 minutes.
            <br />
            Once finished, you'll discover a fascinating secret of consumer psychology!
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.6}>
        <Button onClick={handleStart}>
          Start Quiz →
        </Button>
      </FadeIn>

      <FadeIn delay={0.8}>
        <p className="text-warmBrown/30 text-xs mt-8">
          ※ No personal data is collected. For entertainment and educational purposes only.
        </p>
      </FadeIn>
    </PageContainer>
  )
}
