import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Lesson } from '../data/lessons'

interface QuizProps {
  lesson: Lesson
  moduleColor: string
  onComplete: () => void
}

export function QuizLesson({ lesson, moduleColor, onComplete }: QuizProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)

  const handleSelect = (id: string) => {
    if (revealed) return
    setSelected(id)
  }

  const handleCheck = () => {
    if (!selected) return
    setRevealed(true)
  }

  const correct = lesson.options?.find(o => o.correct)
  const isCorrect = selected === correct?.id
  const selectedOption = lesson.options?.find(o => o.id === selected)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: 680, margin: '0 auto' }}
    >
      {/* Question */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          padding: '24px 28px',
          background: 'white',
          borderRadius: 20,
          border: '1px solid rgba(44,26,14,0.06)',
          marginBottom: 24,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: moduleColor, marginBottom: 10 }}>
          Question
        </div>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.15rem',
          fontWeight: 600,
          color: 'var(--bark)',
          lineHeight: 1.45,
        }}>
          {lesson.question}
        </p>
      </motion.div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {lesson.options?.map((option, i) => {
          let borderColor = 'rgba(44,26,14,0.08)'
          let bg = 'white'
          let textColor = 'var(--bark)'
          let icon = null

          if (revealed) {
            if (option.correct) {
              borderColor = moduleColor
              bg = `${moduleColor}10`
              icon = '✓'
            } else if (option.id === selected && !option.correct) {
              borderColor = '#E05C3A'
              bg = 'rgba(224,92,58,0.06)'
              textColor = '#E05C3A'
              icon = '✗'
            }
          } else if (option.id === selected) {
            borderColor = moduleColor
            bg = `${moduleColor}08`
          }

          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleSelect(option.id)}
              whileHover={!revealed ? { x: 4, transition: { duration: 0.15 } } : {}}
              whileTap={!revealed ? { scale: 0.99 } : {}}
              style={{
                padding: '16px 20px',
                background: bg,
                border: `2px solid ${borderColor}`,
                borderRadius: 14,
                textAlign: 'left',
                cursor: revealed ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-body)',
              }}
            >
              {/* Option letter */}
              <span style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: option.id === selected || (revealed && option.correct)
                  ? (option.correct ? moduleColor : '#E05C3A')
                  : 'var(--cream-2)',
                color: option.id === selected || (revealed && option.correct) ? 'white' : 'var(--bark-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
                transition: 'all 0.2s',
              }}>
                {icon ?? option.id.toUpperCase()}
              </span>
              <span style={{ fontSize: '0.9rem', color: textColor, lineHeight: 1.4, fontWeight: option.id === selected ? 600 : 400 }}>
                {option.text}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {revealed && selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              padding: '20px 24px',
              background: isCorrect ? `${moduleColor}0D` : 'rgba(224,92,58,0.06)',
              borderRadius: 16,
              border: `2px solid ${isCorrect ? moduleColor : '#E05C3A'}33`,
              borderLeft: `4px solid ${isCorrect ? moduleColor : '#E05C3A'}`,
              marginBottom: 20,
            }}
          >
            <div style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: isCorrect ? moduleColor : '#E05C3A',
              marginBottom: 6,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <span style={{ fontSize: 16 }}>{isCorrect ? '🎉' : '💡'}</span>
              {isCorrect ? 'Correct!' : 'Not quite — here\'s why:'}
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--bark-soft)', lineHeight: 1.6 }}>
              {selectedOption.explanation}
            </p>
            {!isCorrect && (
              <p style={{ fontSize: '0.8rem', color: moduleColor, fontWeight: 600, marginTop: 8 }}>
                ✓ The right answer: {correct?.text}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      {!revealed ? (
        <motion.button
          whileHover={{ scale: selected ? 1.02 : 1, y: selected ? -1 : 0 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCheck}
          disabled={!selected}
          style={{
            width: '100%',
            padding: '16px 32px',
            background: selected
              ? `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)`
              : 'var(--cream-3)',
            color: selected ? 'white' : 'var(--bark-muted)',
            border: 'none',
            borderRadius: 16,
            fontSize: '1rem',
            fontWeight: 700,
            fontFamily: 'var(--font-body)',
            cursor: selected ? 'pointer' : 'not-allowed',
            boxShadow: selected ? `0 8px 24px ${moduleColor}35` : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {selected ? 'Check Answer →' : 'Select an answer'}
        </motion.button>
      ) : (
        <motion.button
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          style={{
            width: '100%',
            padding: '16px 32px',
            background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)`,
            color: 'white',
            border: 'none',
            borderRadius: 16,
            fontSize: '1rem',
            fontWeight: 700,
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
            boxShadow: `0 8px 24px ${moduleColor}35`,
          }}
        >
          Continue →
        </motion.button>
      )}
    </motion.div>
  )
}
