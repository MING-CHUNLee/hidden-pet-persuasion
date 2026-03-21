import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer'
import Button from '../components/ui/Button'
import FadeIn from '../components/ui/FadeIn'
import { useQuiz } from '../hooks/useQuiz'

export default function NicknamePage() {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const { setNickname } = useQuiz()

  const handleSubmit = () => {
    const trimmed = input.trim()
    if (!trimmed) {
      setError(true)
      return
    }
    setNickname(trimmed)
    navigate('/door')
  }

  return (
    <PageContainer className="justify-center text-center">
      <FadeIn>
        <div className="text-5xl mb-4">👤</div>
        <h2 className="text-2xl font-bold text-warmBrown mb-2">
          Before we begin...
        </h2>
        <p className="text-warmBrown/60 mb-8">
          Enter a nickname so we can keep track of your result!
        </p>
      </FadeIn>

      <FadeIn delay={0.2} className="w-full max-w-xs">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setError(false)
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Your nickname"
          maxLength={30}
          className={`w-full px-5 py-4 rounded-2xl bg-white/70 text-warmBrown placeholder-warmBrown/30 text-center text-lg outline-none border-2 transition-colors ${
            error ? 'border-red-300' : 'border-transparent focus:border-milk'
          }`}
        />
        {error && (
          <p className="text-red-400 text-sm mt-2">Please enter a nickname to continue.</p>
        )}
      </FadeIn>

      <FadeIn delay={0.4} className="mt-6">
        <Button onClick={handleSubmit}>
          Let's Go →
        </Button>
      </FadeIn>

      <FadeIn delay={0.6}>
        <p className="text-warmBrown/30 text-xs mt-6">
          ※ Nicknames are only used for this study. No personal data is stored.
        </p>
      </FadeIn>
    </PageContainer>
  )
}
