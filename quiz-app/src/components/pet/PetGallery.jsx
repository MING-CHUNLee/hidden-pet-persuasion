import { motion } from 'framer-motion'
import { petData } from './PetScene'

export default function PetGallery({ petType, onSelect }) {
  const pets = petData[petType] || petData.dog

  return (
    <div className="flex gap-5 justify-center">
      {pets.map((pet, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.1, y: -6 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(i)}
          className="flex flex-col items-center gap-2 p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
          style={{
            background: `radial-gradient(circle at 40% 35%, ${pet.bg}, ${pet.ring}30)`,
            border: `2px solid ${pet.ring}`,
            minWidth: 88,
          }}
        >
          <span style={{ fontSize: 64, lineHeight: 1 }}>{pet.emoji}</span>
          <span className="text-warmBrown text-sm font-medium">{pet.name}</span>
        </motion.button>
      ))}
    </div>
  )
}
