import { motion } from 'framer-motion'
import type { Module, UserProgress } from '../data/lessons'

interface HeroProps {
  modules: Module[]
  progress: UserProgress
  onStart: () => void
}

const floatVariants = {
  animate: (i: number) => ({
    y: [0, -8, 0],
    rotate: [0, i % 2 === 0 ? 2 : -2, 0],
    transition: {
      duration: 3 + i * 0.5,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: i * 0.3,
    },
  }),
}

export function Hero({ modules, progress, onStart }: HeroProps) {
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const completedCount = progress.completedLessons.size
  const overallProgress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 24px 60px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative circles */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '8%',
        width: 280,
        height: 280,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,116,42,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '5%',
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,168,83,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Tag */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="badge badge-amber" style={{ marginBottom: 24, display: 'inline-flex' }}>
          <span>✦</span> Interactive UX Education
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          color: 'var(--bark)',
          textAlign: 'center',
          maxWidth: 900,
          marginBottom: 8,
        }}
      >
        Learn UX<br />
        <em style={{ color: 'var(--amber)', fontStyle: 'italic' }}>by doing.</em>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--bark-muted)',
          textAlign: 'center',
          maxWidth: 560,
          lineHeight: 1.65,
          marginTop: 24,
          marginBottom: 40,
          fontWeight: 400,
        }}
      >
        Six interactive modules. Real design examples. No fluff.
        Master the principles that separate good design from great.
      </motion.p>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          gap: 32,
          marginBottom: 44,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {[
          { value: `${modules.length}`, label: 'Modules' },
          { value: `${totalLessons}`, label: 'Lessons' },
          { value: '< 30 min', label: 'Total Time' },
          { value: '880', label: 'Total XP' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem',
              fontWeight: 800,
              color: 'var(--amber)',
              lineHeight: 1,
            }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--bark-muted)', fontWeight: 500, marginTop: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.55, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <button
          onClick={onStart}
          style={{
            padding: '16px 40px',
            background: 'linear-gradient(135deg, var(--bark) 0%, var(--bark-soft) 100%)',
            color: 'var(--cream)',
            borderRadius: 99,
            fontSize: '1rem',
            fontWeight: 700,
            fontFamily: 'var(--font-body)',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.02em',
            boxShadow: '0 8px 32px rgba(44, 26, 14, 0.25)',
            transition: 'transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 200ms ease',
          }}
          onMouseEnter={e => {
            (e.target as HTMLButtonElement).style.transform = 'translateY(-2px) scale(1.02)'
            ;(e.target as HTMLButtonElement).style.boxShadow = '0 16px 48px rgba(44, 26, 14, 0.3)'
          }}
          onMouseLeave={e => {
            (e.target as HTMLButtonElement).style.transform = 'translateY(0) scale(1)'
            ;(e.target as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(44, 26, 14, 0.25)'
          }}
        >
          {completedCount > 0 ? `Continue Learning →` : 'Start Learning →'}
        </button>
      </motion.div>

      {/* Progress bar (if started) */}
      {completedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{ marginTop: 32, width: '100%', maxWidth: 400, textAlign: 'center' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--bark-muted)', fontWeight: 500 }}>Your progress</span>
            <span style={{ fontSize: 12, color: 'var(--amber)', fontWeight: 700 }}>{Math.round(overallProgress)}%</span>
          </div>
          <div className="progress-track">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      )}

      {/* Floating module pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        style={{
          display: 'flex',
          gap: 10,
          marginTop: 60,
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: 700,
        }}
      >
        {modules.map((mod, i) => (
          <motion.div
            key={mod.id}
            custom={i}
            variants={floatVariants}
            animate="animate"
            style={{
              padding: '8px 16px',
              background: 'white',
              borderRadius: 99,
              border: `1px solid ${mod.color}22`,
              boxShadow: `0 4px 16px ${mod.color}18`,
              fontSize: '0.8rem',
              fontWeight: 600,
              color: mod.color,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'default',
            }}
          >
            <span>{mod.emoji}</span>
            <span>{mod.title}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
