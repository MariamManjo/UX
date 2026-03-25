import { motion } from 'framer-motion'
import type { Module, UserProgress } from '../data/lessons'

interface ModuleGridProps {
  modules: Module[]
  progress: UserProgress
  onSelectModule: (moduleId: string) => void
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

function ModuleCard({ mod, progress, onClick }: {
  mod: Module
  progress: UserProgress
  onClick: () => void
}) {
  const completedInModule = mod.lessons.filter(l => progress.completedLessons.has(l.id)).length
  const total = mod.lessons.length
  const pct = total > 0 ? (completedInModule / total) * 100 : 0
  const isComplete = completedInModule === total
  const isStarted = completedInModule > 0

  return (
    <motion.div
      variants={item}
      onClick={onClick}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: 'white',
        borderRadius: 24,
        border: `1px solid ${isComplete ? mod.color + '44' : 'rgba(44,26,14,0.06)'}`,
        padding: 32,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isComplete
          ? `0 8px 32px ${mod.color}20`
          : '0 4px 16px rgba(44,26,14,0.06)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        top: -40,
        right: -40,
        width: 140,
        height: 140,
        borderRadius: '50%',
        background: mod.accentColor,
        opacity: 0.6,
        pointerEvents: 'none',
      }} />

      {/* Module number */}
      <div style={{
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: mod.color,
        opacity: 0.7,
        marginBottom: 16,
      }}>
        Module {String(mod.number).padStart(2, '0')}
      </div>

      {/* Emoji */}
      <div style={{
        width: 56,
        height: 56,
        borderRadius: 16,
        background: `${mod.color}12`,
        border: `2px solid ${mod.color}22`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: mod.emoji.length > 1 ? '1rem' : '1.8rem',
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        color: mod.color,
        marginBottom: 20,
      }}>
        {mod.emoji}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.5rem',
        fontWeight: 800,
        color: 'var(--bark)',
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        marginBottom: 8,
      }}>
        {mod.title}
      </h3>

      {/* Tagline */}
      <p style={{
        fontSize: '0.875rem',
        color: 'var(--bark-muted)',
        lineHeight: 1.5,
        marginBottom: 24,
        fontStyle: 'italic',
      }}>
        {mod.tagline}
      </p>

      {/* Meta */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>
            {total} lessons
          </span>
          <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
            +{mod.xpReward} XP
          </span>
        </div>
        {isComplete && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{ fontSize: 18 }}
          >
            ✅
          </motion.span>
        )}
      </div>

      {/* Progress */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 6,
        }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--bark-muted)', fontWeight: 500 }}>
            {isStarted ? `${completedInModule}/${total} done` : 'Not started'}
          </span>
          {isStarted && (
            <span style={{ fontSize: '0.72rem', color: mod.color, fontWeight: 700 }}>
              {Math.round(pct)}%
            </span>
          )}
        </div>
        <div className="progress-track">
          <motion.div
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${mod.color}, ${mod.color}99)`,
              borderRadius: 99,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
        </div>
      </div>

      {/* Hover arrow */}
      <div style={{
        position: 'absolute',
        bottom: 28,
        right: 28,
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: `${mod.color}15`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        color: mod.color,
        fontWeight: 700,
        transition: 'background 0.2s, transform 0.2s',
      }}>
        →
      </div>
    </motion.div>
  )
}

export function ModuleGrid({ modules, progress, onSelectModule }: ModuleGridProps) {
  return (
    <section style={{ padding: '60px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 48, textAlign: 'center' }}
      >
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: 'var(--bark)',
          letterSpacing: '-0.03em',
          marginBottom: 12,
        }}>
          Choose your module
        </h2>
        <p style={{
          color: 'var(--bark-muted)',
          fontSize: '1rem',
          maxWidth: 480,
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Each module is 5–15 minutes. Learn one principle deeply rather than six principles shallowly.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20,
        }}
      >
        {modules.map((mod) => (
          <ModuleCard
            key={mod.id}
            mod={mod}
            progress={progress}
            onClick={() => onSelectModule(mod.id)}
          />
        ))}
      </motion.div>
    </section>
  )
}
