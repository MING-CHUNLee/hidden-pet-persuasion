import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer'
import DoorAnimation from '../components/door/DoorAnimation'
import FadeIn from '../components/ui/FadeIn'
import { useQuiz } from '../hooks/useQuiz'

export default function DoorPage() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { setPetType } = useQuiz()

  const handleDoorClick = () => {
    if (isOpen) return
    setIsOpen(true)

    // Randomly assign pet type
    const type = Math.random() < 0.5 ? 'dog' : 'cat'
    setPetType(type)

    // Navigate after animation
    setTimeout(() => {
      navigate('/pet')
    }, 1500)
  }

  return (
    <PageContainer className="justify-center text-center">
      <FadeIn>
        <h2 className="text-2xl font-bold text-warmBrown mb-2">
          A mysterious door appears before you...
        </h2>
        <p className="text-warmBrown/60 mb-10">
          {isOpen ? "The door is opening! What's inside?" : "Tap to see what's hidden behind the door."}
        </p>
      </FadeIn>

      <DoorAnimation isOpen={isOpen} onClick={handleDoorClick} />

      {!isOpen && (
        <FadeIn delay={0.5}>
          <p className="text-warmBrown/40 text-sm mt-8 animate-pulse">
            👆 Tap the door to open
          </p>
        </FadeIn>
      )}
    </PageContainer>
  )
}
