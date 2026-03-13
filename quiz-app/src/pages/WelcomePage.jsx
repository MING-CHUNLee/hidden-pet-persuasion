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
    navigate('/door')
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
          你的消費潛意識測驗
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="text-warmBrown/70 text-lg leading-relaxed mb-2">
          你有沒有想過，一次看似無關的互動，
        </p>
        <p className="text-warmBrown/70 text-lg leading-relaxed mb-8">
          可能悄悄改變了你的消費決策？
        </p>
      </FadeIn>

      <FadeIn delay={0.4}>
        <div className="bg-white/60 rounded-2xl p-5 mb-8 max-w-sm">
          <p className="text-warmBrown/60 text-sm leading-relaxed">
            這是一個簡短的互動測驗，只需要 2 分鐘。
            <br />
            測完之後，你會發現一個有趣的消費心理學秘密！
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.6}>
        <Button onClick={handleStart}>
          開始測驗 →
        </Button>
      </FadeIn>

      <FadeIn delay={0.8}>
        <p className="text-warmBrown/30 text-xs mt-8">
          ※ 不收集任何個人資料，純屬娛樂與教育用途
        </p>
      </FadeIn>
    </PageContainer>
  )
}
