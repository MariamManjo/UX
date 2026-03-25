import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface CompletionBurstProps {
  show: boolean
  xpGained: number
  moduleColor: string
  onDone: () => void
}

function Confetti({ color }: { color: string }) {
  const x = (Math.random() - 0.5) * 300
  const y = -(Math.random() * 300 + 100)
  const rotate = Math.random() * 720 - 360
  const size = Math.random() * 10 + 6
  const shape = Math.random() > 0.5 ? '50%' : '2px'

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{ x, y, opacity: 0, rotate, scale: 0.5 }}
      transition={{ duration: 1.2 + Math.random() * 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        background: color,
        borderRadius: shape,
        pointerEvents: 'none',
      }}
    />
  )
}

export function CompletionBurst({ show, xpGained, moduleColor, onDone }: CompletionBurstProps) {
  const [confettis] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      color: [moduleColor, '#D4A853', '#E05C3A', '#FAF6F1', '#2C1A0E'][i % 5],
    }))
  )

  useEffect(() => {
    if (show) {
      const t = setTimeout(onDone, 2400)
      return () => clearTimeout(t)
    }
  }, [show, onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            pointerEvents: 'none',
          }}
        >
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(250, 246, 241, 0.6)',
              backdropFilter: 'blur(8px)',
            }}
          />

          {/* Card */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{
              position: 'relative',
              background: 'white',
              borderRadius: 28,
              padding: '40px 56px',
              textAlign: 'center',
              boxShadow: '0 40px 100px rgba(44,26,14,0.2)',
              border: `2px solid ${moduleColor}33`,
              zIndex: 1,
            }}
          >
            {/* Confetti burst */}
            <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
              {confettis.map((c) => (
                <Confetti key={c.id} color={c.color} />
              ))}
            </div>

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{ fontSize: 52, marginBottom: 12 }}
            >
              🎉
            </motion.div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem',
              fontWeight: 900,
              color: 'var(--bark)',
              letterSpacing: '-0.025em',
              marginBottom: 6,
            }}>
              Lesson Complete!
            </h3>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 400 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 20px',
                background: `${moduleColor}15`,
                borderRadius: 99,
                border: `1.5px solid ${moduleColor}33`,
                marginTop: 8,
              }}
            >
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: moduleColor, fontFamily: 'var(--font-display)' }}>
                +{xpGained}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: moduleColor, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                XP
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
