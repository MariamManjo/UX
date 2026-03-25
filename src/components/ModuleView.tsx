import { motion } from 'framer-motion'
import type { Module, UserProgress } from '../data/lessons'

interface ModuleViewProps {
  module: Module
  progress: UserProgress
  onSelectLesson: (lessonId: string) => void
  onBack: () => void
}

const typeLabels: Record<string, string> = {
  theory: '📖 Theory',
  'before-after': '↔ Compare',
  'spot-issue': '🔍 Spot It',
  quiz: '🧠 Quiz',
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export function ModuleView({ module: mod, progress, onSelectLesson, onBack }: ModuleViewProps) {
  const completedCount = mod.lessons.filter(l => progress.completedLessons.has(l.id)).length
  const pct = mod.lessons.length > 0 ? (completedCount / mod.lessons.length) * 100 : 0

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>

        {/* Back */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onBack}
          style={{
            padding: '8px 16px',
            background: 'white',
            border: '1px solid rgba(44,26,14,0.1)',
            borderRadius: 99,
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--bark-muted)',
            cursor: 'pointer',
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            boxShadow: 'var(--shadow-sm)',
            fontFamily: 'var(--font-body)',
          }}
        >
          ← All Modules
        </motion.button>

        {/* Module header card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'white',
            borderRadius: 28,
            padding: '36px 40px',
            border: `1px solid ${mod.color}22`,
            boxShadow: `0 8px 40px ${mod.color}12`,
            marginBottom: 28,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: mod.accentColor,
            opacity: 0.5,
          }} />

          <div style={{ position: 'relative' }}>
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: mod.color,
              marginBottom: 8,
            }}>
              Module {String(mod.number).padStart(2, '0')}
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 900,
              color: 'var(--bark)',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              marginBottom: 8,
            }}>
              {mod.title}
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--bark-muted)', fontStyle: 'italic', marginBottom: 24 }}>
              {mod.tagline}
            </p>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="badge badge-amber">{mod.lessons.length} lessons</span>
              <span className="badge badge-gold">+{mod.xpReward} XP</span>
              <div style={{ flex: 1, minWidth: 120 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--bark-muted)', fontWeight: 500 }}>{completedCount}/{mod.lessons.length} done</span>
                  <span style={{ fontSize: '0.7rem', color: mod.color, fontWeight: 700 }}>{Math.round(pct)}%</span>
                </div>
                <div className="progress-track" style={{ height: 5 }}>
                  <motion.div
                    style={{ height: '100%', background: `linear-gradient(90deg, ${mod.color}, ${mod.color}99)`, borderRadius: 99 }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lessons list */}
        <motion.div variants={container} initial="hidden" animate="show">
          {mod.lessons.map((lesson, i) => {
            const isDone = progress.completedLessons.has(lesson.id)
            const prevDone = i === 0 || progress.completedLessons.has(mod.lessons[i - 1].id)
            const isLocked = !isDone && !prevDone

            return (
              <motion.div key={lesson.id} variants={item}>
                <button
                  onClick={() => !isLocked ? onSelectLesson(lesson.id) : undefined}
                  disabled={isLocked}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    background: isDone ? `${mod.color}08` : 'white',
                    border: `1.5px solid ${isDone ? mod.color + '33' : 'rgba(44,26,14,0.07)'}`,
                    borderRadius: 18,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    marginBottom: 10,
                    textAlign: 'left',
                    opacity: isLocked ? 0.5 : 1,
                    transition: 'all 0.2s ease',
                    fontFamily: 'var(--font-body)',
                    boxShadow: isDone ? `0 4px 16px ${mod.color}12` : 'var(--shadow-sm)',
                  }}
                  onMouseEnter={e => {
                    if (!isLocked) (e.currentTarget as HTMLButtonElement).style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateX(0)'
                  }}
                >
                  {/* Status icon */}
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: isDone ? mod.color : isLocked ? 'var(--cream-3)' : mod.accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    flexShrink: 0,
                    color: isDone ? 'white' : mod.color,
                    fontWeight: 700,
                    transition: 'all 0.2s',
                  }}>
                    {isDone ? '✓' : isLocked ? '🔒' : i + 1}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span style={{
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: isDone ? mod.color : 'var(--bark)',
                      }}>
                        {lesson.title}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--bark-muted)' }}>
                      {lesson.subtitle}
                    </span>
                  </div>

                  {/* Meta */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 99,
                      background: `${mod.color}12`,
                      color: mod.color,
                    }}>
                      {typeLabels[lesson.type] ?? lesson.type}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--bark-muted)' }}>
                      {lesson.duration}
                    </span>
                  </div>
                </button>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
