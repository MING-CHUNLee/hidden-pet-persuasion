import { createContext, useState, useCallback } from 'react'

export const QuizContext = createContext()

export function QuizProvider({ children }) {
  const [nickname, setNickname] = useState('')
  const [petType, setPetType] = useState(null) // 'dog' | 'cat'
  const [selectedPetIndex, setSelectedPetIndex] = useState(null)
  const [answers, setAnswers] = useState([])

  const addAnswer = useCallback((answer) => {
    setAnswers((prev) => [...prev, answer])
  }, [])

  const reset = useCallback(() => {
    setNickname('')
    setPetType(null)
    setSelectedPetIndex(null)
    setAnswers([])
  }, [])

  const getResult = useCallback(() => {
    const promotionCount = answers.filter((a) => a === 'A').length
    return promotionCount >= 3 ? 'promotion' : 'prevention'
  }, [answers])

  return (
    <QuizContext.Provider
      value={{
        nickname,
        setNickname,
        petType,
        setPetType,
        selectedPetIndex,
        setSelectedPetIndex,
        answers,
        addAnswer,
        getResult,
        reset,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}
