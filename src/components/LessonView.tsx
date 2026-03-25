import { motion, AnimatePresence } from 'framer-motion'
import type { Module, Lesson, UserProgress } from '../data/lessons'
import { TheoryLesson } from './TheoryLesson'
import { BeforeAfterLesson } from './BeforeAfter'
import { SpotIssueLesson } from './SpotIssue'
import { QuizLesson } from './QuizLesson'

interface LessonViewProps {
  module: Module
  lesson: Lesson
  lessonIndex: number
  totalLessons: number
  progress: UserProgress
  onComplete: () => void
  onBack: () => void
}

const typeLabels: Record<string, string> = {
  theory: '📖 Theory',
  'before-after': '↔ Compare',
  'spot-issue': '🔍 Spot It',
  quiz: '🧠 Quiz',
  arrange: '⟳ Arrange',
}

const typeColors: Record<string, string> = {
  theory: 'badge-amber',
  'before-after': 'badge-gold',
  'spot-issue': 'badge-coral',
  quiz: 'badge-amber',
}

export function LessonView({ module: mod, lesson, lessonIndex, totalLessons, progress, onComplete, onBack }: LessonViewProps) {
  const isCompleted = progress.completedLessons.has(lesson.id)

  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: 80,
      paddingBottom: 60,
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 32,
            flexWrap: 'wrap',
          }}
        >
          <button
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
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.2s',
              boxShadow: 'var(--shadow-sm)',
              fontFamily: 'var(--font-body)',
            }}
          >
            ← {mod.title}
          </button>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Lesson progress dots */}
            <div style={{ display: 'flex', gap: 5 }}>
              {Array.from({ length: totalLessons }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === lessonIndex ? 24 : 8,
                    height: 8,
                    borderRadius: 99,
                    background: i < lessonIndex || (i === lessonIndex && isCompleted)
                      ? mod.color
                      : i === lessonIndex
                        ? `${mod.color}66`
                        : 'var(--cream-3)',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--bark-muted)', fontWeight: 500 }}>
              {lessonIndex + 1}/{totalLessons}
            </span>
          </div>

          <span className={`badge ${typeColors[lesson.type] ?? 'badge-amber'}`}>
            {typeLabels[lesson.type] ?? lesson.type}
          </span>
        </motion.div>

        {/* Lesson header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ marginBottom: 36 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: `${mod.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: mod.emoji.length > 1 ? '0.85rem' : '1.3rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              color: mod.color,
            }}>
              {mod.emoji}
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: mod.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {mod.title}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--bark-muted)' }}>
                {lesson.duration} read
              </div>
            </div>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 900,
            color: 'var(--bark)',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            marginBottom: 8,
          }}>
            {lesson.title}
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--bark-muted)',
            lineHeight: 1.5,
            fontStyle: 'italic',
          }}>
            {lesson.subtitle}
          </p>
        </motion.div>

        {/* Lesson content */}
        <AnimatePresence mode="wait">
          <motion.div key={lesson.id}>
            {lesson.type === 'theory' && (
              <TheoryLesson
                lesson={lesson}
                moduleColor={mod.color}
                onComplete={onComplete}
              />
            )}
            {lesson.type === 'before-after' && (
              <BeforeAfterLesson
                lesson={lesson}
                moduleColor={mod.color}
                lessonId={lesson.id}
                onComplete={onComplete}
              />
            )}
            {lesson.type === 'spot-issue' && (
              <SpotIssueLesson
                lesson={lesson}
                moduleColor={mod.color}
                onComplete={onComplete}
              />
            )}
            {lesson.type === 'quiz' && (
              <QuizLesson
                lesson={lesson}
                moduleColor={mod.color}
                onComplete={onComplete}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
