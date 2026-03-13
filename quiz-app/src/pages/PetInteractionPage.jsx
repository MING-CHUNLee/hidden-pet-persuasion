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
      text: '牠興奮地跳來跳去，用鼻子蹭你的手，搖著尾巴渴望你的關注與讚美！',
      button: '摸摸牠',
      icon: '✋',
      reaction: '牠開心地蹭了蹭你的手，尾巴搖得更快了！',
    },
    step3: {
      text: '牠開心地接住你丟出的球，迫不及待地跑回來等你再丟一次！',
      button: '和牠玩',
      icon: '🎾',
      reaction: '牠叼著球跑回來，眼神充滿期待地看著你！',
    },
  },
  cat: {
    step2: {
      text: '牠警覺地觀察著你的每個動作，小心翼翼地確認安全後，才慢慢靠近你的指尖。',
      button: '摸摸牠',
      icon: '✋',
      reaction: '牠猶豫了一下，最後輕輕用頭蹭了蹭你的手指⋯⋯',
    },
    step3: {
      text: '牠小心翼翼地聞了聞你手上的零食，確認沒有危險後才輕輕叼走。',
      button: '餵牠',
      icon: '🍖',
      reaction: '牠滿足地瞇起了眼睛，發出了小小的呼嚕聲⋯⋯',
    },
  },
}

export default function PetInteractionPage() {
  const [step, setStep] = useState(1) // 1=gallery, 2=touch, 3=play/feed
  const [showReaction, setShowReaction] = useState(false)
  const navigate = useNavigate()
  const { petType, selectedPetIndex, setSelectedPetIndex } = useQuiz()

  const petName = petType === 'dog' ? '狗狗' : '貓咪'
  const story = narratives[petType] || narratives.dog

  const handleGallerySelect = (index) => {
    setSelectedPetIndex(index)
    setStep(2)
  }

  const handleInteraction = (nextStep) => {
    setShowReaction(true)
    setTimeout(() => {
      setShowReaction(false)
      if (nextStep === 'done') {
        navigate('/quiz')
      } else {
        setStep(nextStep)
      }
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
                門後面是{petName}！
              </h2>
              <p className="text-warmBrown/60 mb-6">
                這裡有三隻{petName}，選擇你最想互動的那一隻
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
      </AnimatePresence>
    </PageContainer>
  )
}
