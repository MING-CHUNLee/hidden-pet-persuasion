import { motion } from 'framer-motion'

export default function DoorAnimation({ isOpen, onClick }) {
  return (
    <motion.div
      className="relative mx-auto cursor-pointer select-none"
      style={{ width: 190, height: 285 }}
      onClick={!isOpen ? onClick : undefined}
      whileHover={!isOpen ? { scale: 1.03 } : {}}
      whileTap={!isOpen ? { scale: 0.97 } : {}}
    >
      {/* ── Warm glow visible behind door when open ── */}
      <motion.div
        className="absolute rounded-t-[56px] rounded-b-xl"
        style={{
          top: 8, left: 8, right: 8, bottom: 8,
          background:
            'radial-gradient(ellipse at 50% 30%, #FFFDE7 0%, #FFF3CD 45%, #FFE0A0 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ delay: isOpen ? 0.22 : 0, duration: 0.5 }}
      />

      {/* ── Sparkle particles ── */}
      {isOpen &&
        [
          { l: '22%', t: '22%', d: 0.45 },
          { l: '62%', t: '16%', d: 0.60 },
          { l: '44%', t: '40%', d: 0.52 },
          { l: '28%', t: '60%', d: 0.72 },
          { l: '66%', t: '55%', d: 0.82 },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="absolute text-lg pointer-events-none"
            style={{ left: s.l, top: s.t }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0] }}
            transition={{
              delay: s.d,
              duration: 1.1,
              repeat: Infinity,
              repeatDelay: 1.3,
            }}
          >
            ✨
          </motion.div>
        ))}

      {/* ── Perspective container (NO overflow:hidden — kills 3D) ── */}
      <div
        className="absolute rounded-t-[56px] rounded-b-xl"
        style={{
          top: 8, left: 8, right: 8, bottom: 8,
          perspective: '600px',
        }}
      >
        {/* Door panel — rotates from left edge */}
        <motion.div
          className="absolute inset-0 rounded-t-[52px] rounded-b-lg"
          style={{
            transformOrigin: 'left center',
            background:
              'linear-gradient(155deg, #C8A060 0%, #A07840 30%, #8B6030 65%, #6D4820 100%)',
            boxShadow: '2px 0 12px rgba(0,0,0,0.18)',
          }}
          animate={{ rotateY: isOpen ? -82 : 0 }}
          transition={{ duration: 0.95, ease: [0.4, 0, 0.15, 1] }}
        >
          {/* Subtle wood-grain lines */}
          {[38, 68, 100, 135, 168, 205, 238].map((y) => (
            <div
              key={y}
              className="absolute left-4 right-4"
              style={{ top: y, height: 1, background: 'rgba(60,30,5,0.10)' }}
            />
          ))}

          {/* Upper recessed panel */}
          <div
            className="absolute rounded-xl"
            style={{
              left: 18, right: 18, top: 22, height: 90,
              background:
                'linear-gradient(150deg, #90582A 0%, #784420 100%)',
              boxShadow:
                'inset 0 2px 6px rgba(0,0,0,0.38), inset 0 -1px 2px rgba(255,210,130,0.12)',
            }}
          />

          {/* Lower recessed panel */}
          <div
            className="absolute rounded-xl"
            style={{
              left: 18, right: 18, top: 126, bottom: 20,
              background:
                'linear-gradient(150deg, #90582A 0%, #784420 100%)',
              boxShadow:
                'inset 0 2px 6px rgba(0,0,0,0.38), inset 0 -1px 2px rgba(255,210,130,0.12)',
            }}
          />

          {/* Knob backplate */}
          <div
            className="absolute rounded-md"
            style={{
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 14,
              height: 38,
              background: 'rgba(50,25,8,0.45)',
            }}
          />

          {/* Brass knob */}
          <div
            className="absolute rounded-full"
            style={{
              right: 16,
              top: '50%',
              transform: 'translateY(calc(-50% - 4px))',
              width: 16,
              height: 16,
              background:
                'radial-gradient(circle at 35% 30%, #FFE082, #FFA000 58%, #E65100)',
              boxShadow:
                '0 2px 5px rgba(0,0,0,0.5), inset 0 1px 3px rgba(255,240,190,0.45)',
            }}
          />
        </motion.div>
      </div>

      {/* ── Frame border — sits on top, pointer-events-none ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          borderRadius: '64px 64px 16px 16px',
          border: '9px solid #4E342E',
          boxShadow:
            '0 10px 36px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,200,140,0.08)',
        }}
      />

      {/* Doorstep */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-b-xl"
        style={{
          bottom: -8,
          width: 210,
          height: 14,
          background: 'linear-gradient(180deg, #5D4037 0%, #4E342E 100%)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        }}
      />

      {/* Floating star before interaction */}
      {!isOpen && (
        <motion.div
          className="absolute -top-9 left-1/2 -translate-x-1/2 text-3xl pointer-events-none"
          animate={{ y: [0, -10, 0], opacity: [0.65, 1, 0.65] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          ✨
        </motion.div>
      )}
    </motion.div>
  )
}
