import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { submitToSheets } from '../services/sheetsService'
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
  const { nickname, getResult, petType, answers } = useQuiz()
  const captureRef = useRef(null)
  const submitted = useRef(false)

  const resultType = getResult()
  const result = results[resultType]

  useEffect(() => {
    if (submitted.current) return
    submitted.current = true
    submitToSheets({ nickname, petType, quizResult: resultType, answers })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PageContainer className="gap-6">
      {/* Capturable area for image sharing */}
      <div ref={captureRef} className="w-full flex flex-col gap-6 bg-cream p-4 rounded-3xl">
        <FadeIn>
          <p className="text-warmBrown/50 text-sm text-center">Quiz Result!</p>
        </FadeIn>

        <ResultCard result={result} />

        <RevealSection petType={petType} />

        <p className="text-warmBrown/30 text-xs text-center">🔗 The Hidden Consumer Traits Quiz</p>
      </div>

      <ShareButtons resultType={result.type} captureRef={captureRef} />

      <FadeIn delay={1.4}>
        <Button variant="ghost" onClick={() => navigate('/')}>
          Retake Quiz
        </Button>
      </FadeIn>
    </PageContainer>
  )
}
