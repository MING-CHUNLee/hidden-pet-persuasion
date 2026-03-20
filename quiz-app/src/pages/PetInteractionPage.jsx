import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageContainer from '../components/layout/PageContainer'
import PetGallery from '../components/pet/PetGallery'
import PetScene from '../components/pet/PetScene'
import InteractionButton from '../components/pet/InteractionButton'
import FadeIn from '../components/ui/FadeIn'
import { useQuiz } from '../hooks/useQuiz'

const narratives = {
  dog: {
    step2: {
      text: 'It jumps around excitedly, giving your hand a soft nudge with its nose, tail wagging eagerly for your attention!',
      button: 'Pet',
      icon: '✋',
      reaction: 'It happily nuzzles your hand, tail wagging even faster!',
    },
    step3: {
      text: 'It watches the hose in your hand with excitement, bouncing around and ready to catch some refreshing blasts of water!',
      button: 'Spray water',
      icon: '💦',
      reaction: 'Wow! It excitedly snaps at the splashing water, completely soaked and loving every second of it!',
    },
  },
  cat: {
    step2: {
      text: 'It watches your every move alertly. After cautiously confirming it\'s safe, it slowly approaches your fingertips.',
      button: 'Pet',
      icon: '✋',
      reaction: 'It hesitates for a moment, then gently rubs its head against your fingers...',
    },
    step3: {
      text: 'You bring out some warm milk. Its ears immediately perk up, eyes shining with eager anticipation.',
      button: 'Pour milk',
      icon: '🥛',
      reaction: 'Watching it eagerly lap up the milk while purring in sheer contentment is just so heartwarming!',
    },
  },
}

export default function PetInteractionPage() {
  const [step, setStep] = useState(1) // 1=gallery, 2=touch, 3=play/feed
  const [showReaction, setShowReaction] = useState(false)
  const navigate = useNavigate()
  const { petType, selectedPetIndex, setSelectedPetIndex } = useQuiz()

  const petName = petType === 'dog' ? 'dog' : 'cat'
  const petNamePlural = petType === 'dog' ? 'dogs' : 'cats'
  const story = narratives[petType] || narratives.dog

  const handleGallerySelect = (index) => {
    setSelectedPetIndex(index)
    setStep(2)
  }

  const handleInteraction = (nextStep) => {
    if (nextStep === 'done') {
      setStep('video')
      return
    }

    setShowReaction(true)
    setTimeout(() => {
      setShowReaction(false)
      setStep(nextStep)
    }, 1800)
  }

  return (
    <PageContainer className="justify-center text-center">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <FadeIn>
              <h2 className="text-2xl font-bold text-warmBrown mb-2">
                There's a {petName} behind the door!
              </h2>
              <p className="text-warmBrown/60 mb-6">
                Here are three {petNamePlural}, choose the one you'd love to interact with most
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <PetGallery petType={petType} onSelect={handleGallerySelect} />
            </FadeIn>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full flex flex-col items-center"
          >
            <PetScene
              petType={petType}
              variant={selectedPetIndex}
              size={150}
              animate={!showReaction}
            />

            <div className="bg-white/60 rounded-2xl p-5 my-6 max-w-sm">
              <p className="text-warmBrown leading-relaxed">
                {showReaction ? story.step2.reaction : story.step2.text}
              </p>
            </div>

            {!showReaction && (
              <InteractionButton
                label={story.step2.button}
                icon={story.step2.icon}
                onClick={() => handleInteraction(3)}
              />
            )}

            {showReaction && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                className="text-4xl"
              >
                {petType === 'dog' ? '💕' : '🤍'}
              </motion.div>
            )}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full flex flex-col items-center"
          >
            <PetScene
              petType={petType}
              variant={selectedPetIndex}
              size={150}
              animate={!showReaction}
            />

            <div className="bg-white/60 rounded-2xl p-5 my-6 max-w-sm">
              <p className="text-warmBrown leading-relaxed">
                {showReaction ? story.step3.reaction : story.step3.text}
              </p>
            </div>

            {!showReaction && (
              <InteractionButton
                label={story.step3.button}
                icon={story.step3.icon}
                onClick={() => handleInteraction('done')}
              />
            )}

            {showReaction && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                className="text-4xl"
              >
                {petType === 'dog' ? '🎉' : '😺'}
              </motion.div>
            )}
          </motion.div>
        )}

        {step === 'video' && (
          <motion.div
            key="video"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full flex flex-col items-center"
          >
            <div className="bg-white/60 rounded-2xl p-5 my-6 max-w-sm w-full mx-auto">
              <p className="text-warmBrown leading-relaxed mb-4">
                {story.step3.reaction}
              </p>
              <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-lg mx-auto bg-black/5">
                <iframe
                  src={`https://www.youtube.com/embed/${petType === 'dog' ? 'bwPEI9EGlE8' : 'SPjMp9OTBE0'}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            </div>

            <InteractionButton
              label="Start Quiz"
              icon="➡️"
              onClick={() => navigate('/quiz')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  )
}
