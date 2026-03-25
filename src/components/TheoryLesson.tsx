import { motion } from 'framer-motion'
import type { Lesson } from '../data/lessons'

interface TheoryProps {
  lesson: Lesson
  moduleColor: string
  onComplete: () => void
}

function HierarchyVisual() {
  return (
    <div style={{
      background: 'white',
      borderRadius: 20,
      padding: 32,
      border: '1px solid rgba(44,26,14,0.06)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        style={{ display: 'flex', alignItems: 'center', gap: 12 }}
      >
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--bark)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 10, fontWeight: 700 }}>1st</div>
        <div>
          <div style={{ height: 24, background: 'var(--bark)', borderRadius: 4, width: 280 }} />
          <div style={{ fontSize: 11, color: 'var(--bark-muted)', marginTop: 4 }}>Large headline — highest visual weight → seen first</div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.45 }}
        style={{ display: 'flex', alignItems: 'center', gap: 12 }}
      >
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--bark-soft)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 10, fontWeight: 700 }}>2nd</div>
        <div style={{ flex: 1 }}>
          <div style={{ height: 10, background: 'var(--bark-muted)', borderRadius: 4, width: '90%', marginBottom: 5 }} />
          <div style={{ height: 10, background: 'var(--bark-muted)', borderRadius: 4, width: '75%', opacity: 0.6 }} />
          <div style={{ fontSize: 11, color: 'var(--bark-muted)', marginTop: 4 }}>Body text — medium weight → seen second</div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        style={{ display: 'flex', alignItems: 'center', gap: 12 }}
      >
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--amber)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 10, fontWeight: 700 }}>3rd</div>
        <div>
          <div style={{
            padding: '10px 24px',
            background: 'var(--amber)',
            color: 'white',
            borderRadius: 99,
            fontSize: 12,
            fontWeight: 700,
            display: 'inline-block',
          }}>
            CTA Button
          </div>
          <div style={{ fontSize: 11, color: 'var(--bark-muted)', marginTop: 4 }}>Action — accent color → clear call-to-action</div>
        </div>
      </motion.div>
    </div>
  )
}

function WhitespaceVisual() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {/* Bad */}
      <div style={{
        background: 'white',
        borderRadius: 16,
        padding: 10,
        border: '2px solid rgba(224,92,58,0.3)',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: -10, left: 12 }}>
          <span className="badge badge-coral" style={{ fontSize: '0.6rem' }}>Bad</span>
        </div>
        <div style={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ height: 10, background: 'var(--bark)', borderRadius: 2, width: '95%' }} />
          <div style={{ height: 7, background: 'var(--bark-muted)', borderRadius: 2, width: '90%' }} />
          <div style={{ height: 7, background: 'var(--bark-muted)', borderRadius: 2, width: '85%' }} />
          <div style={{ height: 7, background: 'var(--bark-muted)', borderRadius: 2, width: '92%' }} />
          <div style={{ height: 7, background: 'var(--bark-muted)', borderRadius: 2, width: '78%' }} />
          <div style={{ height: 20, background: 'var(--coral)', borderRadius: 4, width: '98%', marginTop: 2 }} />
        </div>
        <p style={{ fontSize: 9, color: 'var(--coral)', marginTop: 6, textAlign: 'center', fontWeight: 600 }}>Everything crammed</p>
      </div>
      {/* Good */}
      <div style={{
        background: 'white',
        borderRadius: 16,
        padding: 16,
        border: '2px solid rgba(196,116,42,0.3)',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: -10, left: 12 }}>
          <span className="badge badge-amber" style={{ fontSize: '0.6rem' }}>Good</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ height: 12, background: 'var(--bark)', borderRadius: 3, width: '80%' }} />
          <div style={{ height: 6, background: 'var(--bark-muted)', borderRadius: 2, width: '90%', opacity: 0.7 }} />
          <div style={{ height: 6, background: 'var(--bark-muted)', borderRadius: 2, width: '75%', opacity: 0.5 }} />
          <div style={{ height: 28, background: 'var(--amber)', borderRadius: 8, width: '60%', alignSelf: 'flex-start', marginTop: 8 }} />
        </div>
        <p style={{ fontSize: 9, color: 'var(--amber-dark)', marginTop: 8, textAlign: 'center', fontWeight: 600 }}>Breathing room</p>
      </div>
    </div>
  )
}

function TypographyVisual() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div style={{
        background: 'white',
        borderRadius: 16,
        padding: 20,
        border: '2px solid rgba(224,92,58,0.25)',
      }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--coral)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Hard to Read</div>
        <p style={{ fontSize: 10, lineHeight: 1.2, color: '#888', letterSpacing: '-0.02em', fontFamily: 'Georgia' }}>
          This text has terrible line height making it almost impossible to track from line to line without losing your place completely.
        </p>
      </div>
      <div style={{
        background: 'white',
        borderRadius: 16,
        padding: 20,
        border: '2px solid rgba(196,116,42,0.25)',
      }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--amber-dark)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Optimized</div>
        <p style={{ fontSize: 10, lineHeight: 1.7, color: 'var(--bark)', letterSpacing: '0.01em' }}>
          This text uses proper line height (1.6–1.7) making it easy to read and track lines from left to right naturally.
        </p>
      </div>
    </div>
  )
}

function ColorVisual() {
  const pairs = [
    { bg: '#FFFFFF', text: '#CCCCCC', label: '2.3:1', pass: false },
    { bg: '#FFFFFF', text: '#767676', label: '4.5:1', pass: true },
    { bg: '#C4742A', text: '#FFFFFF', label: '4.6:1', pass: true },
    { bg: '#FFFF00', text: '#FFFFFF', label: '1.07:1', pass: false },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      {pairs.map((p) => (
        <div key={p.bg + p.text} style={{
          background: p.bg,
          borderRadius: 12,
          padding: '16px 20px',
          border: `2px solid ${p.pass ? 'rgba(196,116,42,0.3)' : 'rgba(224,92,58,0.3)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{ color: p.text, fontWeight: 700, fontSize: 13 }}>Text</span>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            color: p.pass ? 'var(--amber-dark)' : 'var(--coral)',
            background: p.pass ? 'rgba(196,116,42,0.1)' : 'rgba(224,92,58,0.1)',
            padding: '2px 8px',
            borderRadius: 99,
          }}>
            {p.pass ? '✓' : '✗'} {p.label}
          </span>
        </div>
      ))}
    </div>
  )
}

function GestaltVisual() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {/* Proximity */}
      <div style={{ background: 'white', borderRadius: 16, padding: 20, border: '1px solid rgba(44,26,14,0.08)' }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--amber-dark)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Proximity</div>
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[1,2,3].map(i => <div key={i} style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--amber)', opacity: 0.3 + i * 0.2 }} />)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[1,2,3].map(i => <div key={i} style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--bark)', opacity: 0.3 + i * 0.2 }} />)}
          </div>
        </div>
        <p style={{ fontSize: 9, color: 'var(--bark-muted)', marginTop: 8 }}>Close = grouped in mind</p>
      </div>
      {/* Similarity */}
      <div style={{ background: 'white', borderRadius: 16, padding: 20, border: '1px solid rgba(44,26,14,0.08)' }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--amber-dark)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Similarity</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {[0,1,2,3,4,5,6,7].map(i => (
            <div key={i} style={{
              width: 20, height: 20,
              borderRadius: i % 2 === 0 ? 4 : '50%',
              background: i % 2 === 0 ? 'var(--amber)' : 'var(--bark-muted)',
            }} />
          ))}
        </div>
        <p style={{ fontSize: 9, color: 'var(--bark-muted)', marginTop: 8 }}>Same shape = same type</p>
      </div>
    </div>
  )
}

function ContrastVisual() {
  const states = [
    { label: 'Default', bg: '#F4ECE1', color: 'var(--bark)', border: '2px solid rgba(44,26,14,0.1)' },
    { label: 'Hover', bg: '#EDE0CF', color: 'var(--bark)', border: '2px solid rgba(196,116,42,0.3)' },
    { label: 'Active', bg: 'var(--amber)', color: 'white', border: '2px solid var(--amber)' },
    { label: 'Loading', bg: 'var(--amber)', color: 'white', border: '2px solid var(--amber)', loading: true },
    { label: 'Success', bg: '#2D6A4F', color: 'white', border: '2px solid #2D6A4F' },
    { label: 'Disabled', bg: '#E8E0D8', color: '#AAA', border: '2px solid transparent' },
  ]
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {states.map((s) => (
        <div key={s.label} style={{
          padding: '8px 18px',
          borderRadius: 99,
          background: s.bg,
          color: s.color,
          border: s.border,
          fontSize: 11,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          cursor: s.label === 'Disabled' ? 'not-allowed' : 'pointer',
          opacity: s.label === 'Disabled' ? 0.5 : 1,
        }}>
          {s.loading && (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ display: 'inline-block' }}
            >
              ⟳
            </motion.span>
          )}
          {s.label === 'Success' && '✓ '}
          {s.label}
        </div>
      ))}
    </div>
  )
}

const VisualMap: Record<string, React.FC> = {
  hierarchy: HierarchyVisual,
  whitespace: WhitespaceVisual,
  typography: TypographyVisual,
  color: ColorVisual,
  gestalt: GestaltVisual,
  contrast: ContrastVisual,
}

export function TheoryLesson({ lesson, moduleColor, onComplete }: TheoryProps) {
  const VisualComponent = lesson.visualType ? VisualMap[lesson.visualType] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ maxWidth: 680, margin: '0 auto' }}
    >
      {/* Principle callout */}
      {lesson.principle && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            padding: '24px 28px',
            background: `${moduleColor}10`,
            borderRadius: 20,
            borderLeft: `4px solid ${moduleColor}`,
            marginBottom: 28,
          }}
        >
          <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: moduleColor, marginBottom: 8 }}>
            Core Principle
          </div>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            fontWeight: 600,
            color: 'var(--bark)',
            lineHeight: 1.4,
            fontStyle: 'italic',
          }}>
            "{lesson.principle}"
          </p>
        </motion.div>
      )}

      {/* Description */}
      {lesson.description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            fontSize: '1.05rem',
            color: 'var(--bark-soft)',
            lineHeight: 1.75,
            marginBottom: 32,
          }}
        >
          {lesson.description}
        </motion.p>
      )}

      {/* Visual */}
      {VisualComponent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ marginBottom: 36 }}
        >
          <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--bark-muted)', marginBottom: 14 }}>
            Visual Example
          </div>
          <VisualComponent />
        </motion.div>
      )}

      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
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
          letterSpacing: '0.02em',
        }}
      >
        Got it — Next Lesson →
      </motion.button>
    </motion.div>
  )
}
