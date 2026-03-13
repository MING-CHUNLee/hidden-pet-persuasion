import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer'
import ProgressBar from '../components/quiz/ProgressBar'
import QuestionCard from '../components/quiz/QuestionCard'
import { questions } from '../data/questions'
import { useQuiz } from '../hooks/useQuiz'

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate()
  const { addAnswer } = useQuiz()

  const handleAnswer = (answer) => {
    addAnswer(answer)

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      navigate('/result')
    }
  }

  return (
    <PageContainer>
      <div className="w-full mb-6">
        <ProgressBar current={currentIndex} total={questions.length} />
      </div>

      <QuestionCard
        question={questions[currentIndex]}
        onAnswer={handleAnswer}
      />
    </PageContainer>
  )
}
