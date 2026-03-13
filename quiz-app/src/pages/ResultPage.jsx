import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer'
import ResultCard from '../components/result/ResultCard'
import RevealSection from '../components/result/RevealSection'
import ShareButtons from '../components/result/ShareButtons'
import Button from '../components/ui/Button'
import FadeIn from '../components/ui/FadeIn'
import { results } from '../data/results'
import { useQuiz } from '../hooks/useQuiz'

export default function ResultPage() {
  const navigate = useNavigate()
  const { getResult, petType } = useQuiz()
  const captureRef = useRef(null)

  const resultType = getResult()
  const result = results[resultType]

  return (
    <PageContainer className="gap-6">
      {/* Capturable area for image sharing */}
      <div ref={captureRef} className="w-full flex flex-col gap-6 bg-cream p-4 rounded-3xl">
        <FadeIn>
          <p className="text-warmBrown/50 text-sm text-center">測驗結果出爐！</p>
        </FadeIn>

        <ResultCard result={result} />

        <RevealSection petType={petType} />

        <p className="text-warmBrown/30 text-xs text-center">🔗 你的消費潛意識測驗</p>
      </div>

      <ShareButtons resultType={result.type} captureRef={captureRef} />

      <FadeIn delay={1.4}>
        <Button variant="ghost" onClick={() => navigate('/')}>
          再測一次
        </Button>
      </FadeIn>
    </PageContainer>
  )
}
