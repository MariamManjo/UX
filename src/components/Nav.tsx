import { motion } from 'framer-motion'
import type { UserProgress } from '../data/lessons'

interface NavProps {
  progress: UserProgress
  onHome: () => void
  currentScreen: string
}

export function Nav({ progress, onHome, currentScreen }: NavProps) {
  const level = Math.floor(progress.xp / 100) + 1
  const xpInLevel = progress.xp % 100

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 32px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(250, 246, 241, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(44, 26, 14, 0.06)',
      }}
    >
      {/* Logo */}
      <button
        onClick={onHome}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
          background: 'none',
          border: 'none',
        }}
      >
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #C4742A, #E8975A)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(196, 116, 42, 0.35)',
        }}>
          <span style={{ color: 'white', fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-display)' }}>U</span>
        </div>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: 'var(--bark)',
          letterSpacing: '-0.02em',
        }}>
          UXLAB
        </span>
      </button>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* XP pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 14px',
          background: 'rgba(196, 116, 42, 0.08)',
          borderRadius: 99,
          border: '1px solid rgba(196, 116, 42, 0.18)',
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--amber-dark)', letterSpacing: '0.05em' }}>
            LV {level}
          </span>
          <div style={{ width: 40, height: 3, background: 'var(--cream-3)', borderRadius: 99, overflow: 'hidden' }}>
            <motion.div
              style={{ height: '100%', background: 'linear-gradient(90deg, #C4742A, #E8975A)', borderRadius: 99 }}
              initial={{ width: 0 }}
              animate={{ width: `${xpInLevel}%` }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <span style={{ fontSize: 11, color: 'var(--bark-muted)', fontWeight: 500 }}>
            {progress.xp} XP
          </span>
        </div>

        {/* Streak */}
        {progress.streak > 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '6px 12px',
            background: 'rgba(224, 92, 58, 0.08)',
            borderRadius: 99,
            border: '1px solid rgba(224, 92, 58, 0.15)',
          }}>
            <span style={{ fontSize: 14 }}>🔥</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--coral)' }}>{progress.streak}</span>
          </div>
        )}

        {/* Completed count */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontSize: 12,
          color: 'var(--bark-muted)',
          fontWeight: 500,
        }}>
          <span style={{ color: 'var(--amber)', fontWeight: 700 }}>{progress.completedLessons.size}</span>
          <span>completed</span>
        </div>
      </div>
    </motion.nav>
  )
}
