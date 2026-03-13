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
          眼前出現了一扇神秘的門⋯⋯
        </h2>
        <p className="text-warmBrown/60 mb-10">
          {isOpen ? '門開了！裡面有什麼呢？' : '點一下，看看門後藏著什麼？'}
        </p>
      </FadeIn>

      <DoorAnimation isOpen={isOpen} onClick={handleDoorClick} />

      {!isOpen && (
        <FadeIn delay={0.5}>
          <p className="text-warmBrown/40 text-sm mt-8 animate-pulse">
            👆 點擊門來開啟
          </p>
        </FadeIn>
      )}
    </PageContainer>
  )
}
