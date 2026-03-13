import { motion } from 'framer-motion'

export const petData = {
  dog: [
    { emoji: '🐶', name: '小柴柴',  bg: '#FFF3D6', ring: '#E8C07A' },
    { emoji: '🦮', name: '大金毛',  bg: '#FFF0D8', ring: '#F0A860' },
    { emoji: '🐩', name: '捲捲',    bg: '#FFF8F4', ring: '#D4A574' },
  ],
  cat: [
    { emoji: '🐱', name: '灰灰',    bg: '#F2F4F8', ring: '#A8B4C0' },
    { emoji: '🐈', name: '橘橘',    bg: '#FFF4E6', ring: '#F0A850' },
    { emoji: '😻', name: '甜甜',    bg: '#FFF0F4', ring: '#F0A0B8' },
  ],
}

export default function PetScene({ petType, variant = 0, size = 120, animate = false }) {
  const pets = petData[petType] || petData.dog
  const pet = pets[variant] || pets[0]
  const emojiSize = Math.round(size * 0.52)

  return (
    <motion.div
      className="inline-flex items-center justify-center rounded-full shadow-lg"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 40% 38%, ${pet.bg}, ${pet.ring}40)`,
        border: `3px solid ${pet.ring}`,
        flexShrink: 0,
      }}
      animate={
        animate
          ? petType === 'dog'
            ? { y: [0, -10, 0], rotate: [0, 4, -4, 0] }
            : { y: [0, -5, 0], scale: [1, 1.04, 1] }
          : {}
      }
      transition={
        animate
          ? {
              repeat: Infinity,
              duration: petType === 'dog' ? 1.1 : 2.4,
              ease: 'easeInOut',
            }
          : {}
      }
    >
      <span style={{ fontSize: emojiSize, lineHeight: 1 }}>{pet.emoji}</span>
    </motion.div>
  )
}
