import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Lesson, SpotIssue } from '../data/lessons'

interface SpotIssueProps {
  lesson: Lesson
  moduleColor: string
  onComplete: () => void
}

function getMockScreen(lessonId: string) {
  if (lessonId === 'ws-spot') {
    return (
      <div style={{ width: '100%', height: '100%', background: '#F0EBE4', position: 'relative', fontSize: 11 }}>
        {/* Header - text touching edge */}
        <div style={{ background: '#C4742A', padding: '10px 0 10px 0', display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'white', fontWeight: 700, fontSize: 13, marginLeft: 4 }}>BrandName</span>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10, marginLeft: 'auto', marginRight: 8 }}>Menu</span>
        </div>
        {/* Hero section - no gap between sections */}
        <div style={{ padding: '10px 8px', background: 'white', borderBottom: '0px' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1410', marginBottom: 2 }}>Welcome to Our Platform</p>
          <p style={{ fontSize: 10, color: '#888', lineHeight: 1.3 }}>We help teams collaborate and ship great products faster than ever before with our amazing tools.</p>
        </div>
        {/* Section directly below - no gap */}
        <div style={{ padding: '10px 8px', background: '#F8F4EE' }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#333', marginBottom: 4 }}>Our Features</p>
          <div style={{ display: 'flex', gap: 4 }}>
            <div style={{ flex: 1, background: '#EDE0CF', padding: '6px 4px', borderRadius: 4, fontSize: 9, color: '#555' }}>
              <div style={{ marginBottom: 2 }}>⚡</div>Fast
            </div>
            <div style={{ flex: 1, background: '#EDE0CF', padding: '6px 4px', borderRadius: 4, fontSize: 9, color: '#555' }}>
              {/* Icon overlapping */}
              <div style={{ fontSize: 12, marginLeft: 24, marginBottom: -4 }}>🔒</div>
              <div>Secure</div>
            </div>
            <div style={{ flex: 1, background: '#EDE0CF', padding: '6px 4px', borderRadius: 4, fontSize: 9, color: '#555' }}>
              <div style={{ marginBottom: 2 }}>📊</div>Analytics
            </div>
          </div>
        </div>
        {/* Button too close to copy */}
        <div style={{ padding: '6px 8px', background: 'white' }}>
          <p style={{ fontSize: 9, color: '#888', marginBottom: 2 }}>Ready to get started? Sign up today!</p>
          <button style={{ background: '#C4742A', color: 'white', border: 'none', padding: '5px 12px', fontSize: 9, borderRadius: 4, cursor: 'pointer', marginTop: 1 }}>
            Get Started Free
          </button>
        </div>
      </div>
    )
  }
  if (lessonId === 'col-spot') {
    return (
      <div style={{ width: '100%', height: '100%', background: 'white', position: 'relative', fontSize: 11 }}>
        <div style={{ background: '#F8F8F8', padding: '10px 12px', borderBottom: '1px solid #EEE' }}>
          <span style={{ fontWeight: 700, color: '#333' }}>Dashboard</span>
        </div>
        {/* Light grey on white */}
        <div style={{ padding: '12px 12px 8px' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#BBBBBB' }}>Recent Activity</p>
          <p style={{ fontSize: 10, color: '#CCCCCC', lineHeight: 1.4 }}>You have no recent activity to display. Check back later for updates.</p>
        </div>
        {/* Yellow text on white */}
        <div style={{ padding: '0 12px 10px' }}>
          <div style={{ background: '#FFFDE7', padding: '8px 10px', borderRadius: 8, border: '1px solid #FFF9C4' }}>
            <p style={{ color: '#FFEB3B', fontWeight: 700, fontSize: 11 }}>⚠ Important Notice</p>
            <p style={{ color: '#FFF176', fontSize: 9 }}>Your subscription expires in 3 days.</p>
          </div>
        </div>
        {/* White text on pale bg */}
        <div style={{ padding: '0 12px 10px' }}>
          <div style={{ background: '#FFE0E0', padding: '8px 10px', borderRadius: 8 }}>
            <p style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 11 }}>Error occurred</p>
            <p style={{ color: '#FFFFFF', fontSize: 9 }}>Please try again later</p>
          </div>
        </div>
        {/* Placeholder as label */}
        <div style={{ padding: '0 12px' }}>
          <input
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #E0E0E0', borderRadius: 6, fontSize: 10, color: '#AAAAAA', background: 'white', outline: 'none' }}
            placeholder="Email address"
            readOnly
          />
        </div>
      </div>
    )
  }
  return (
    <div style={{ width: '100%', height: '100%', background: '#F8F4EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#AAA', fontSize: 12 }}>Mock interface</p>
    </div>
  )
}

export function SpotIssueLesson({ lesson, moduleColor, onComplete }: SpotIssueProps) {
  const [found, setFound] = useState<Set<string>>(new Set())
  const [activeExplanation, setActiveExplanation] = useState<SpotIssue | null>(null)
  const allFound = found.size === (lesson.spotIssues?.length ?? 0)

  const handleSpot = (issue: SpotIssue) => {
    setFound(prev => new Set([...prev, issue.id]))
    setActiveExplanation(issue)
    setTimeout(() => setActiveExplanation(null), 3000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: 680, margin: '0 auto' }}
    >
      {/* Score */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {lesson.spotIssues?.map((issue) => (
            <motion.div
              key={issue.id}
              animate={{ scale: found.has(issue.id) ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.3 }}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: found.has(issue.id) ? moduleColor : 'var(--cream-3)',
                border: `2px solid ${found.has(issue.id) ? moduleColor : 'rgba(44,26,14,0.1)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                transition: 'all 0.3s',
              }}
            >
              {found.has(issue.id) ? '✓' : '?'}
            </motion.div>
          ))}
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--bark-muted)', fontWeight: 500 }}>
          {found.size}/{lesson.spotIssues?.length ?? 0} found
        </span>
      </div>

      {/* Mock screen with hotspots */}
      <div style={{
        position: 'relative',
        height: 340,
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid rgba(44,26,14,0.08)',
        marginBottom: 20,
      }}>
        {getMockScreen(lesson.id)}

        {/* Hotspot markers */}
        {lesson.spotIssues?.map((issue) => (
          <motion.button
            key={issue.id}
            onClick={() => handleSpot(issue)}
            style={{
              position: 'absolute',
              left: `${issue.x}%`,
              top: `${issue.y}%`,
              transform: 'translate(-50%, -50%)',
              width: found.has(issue.id) ? 30 : 24,
              height: found.has(issue.id) ? 30 : 24,
              borderRadius: '50%',
              background: found.has(issue.id) ? moduleColor : 'rgba(224,92,58,0.85)',
              border: '2px solid white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              color: 'white',
              fontWeight: 700,
              boxShadow: found.has(issue.id)
                ? `0 0 0 4px ${moduleColor}33`
                : '0 0 0 4px rgba(224,92,58,0.25)',
              transition: 'all 0.25s',
              zIndex: 10,
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            animate={found.has(issue.id) ? {} : {
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 0 4px rgba(224,92,58,0.25)',
                '0 0 0 8px rgba(224,92,58,0.15)',
                '0 0 0 4px rgba(224,92,58,0.25)',
              ],
            }}
            transition={{ duration: 2, repeat: found.has(issue.id) ? 0 : Infinity }}
          >
            {found.has(issue.id) ? '✓' : '!'}
          </motion.button>
        ))}
      </div>

      {/* Explanation popup */}
      <AnimatePresence>
        {activeExplanation && (
          <motion.div
            key={activeExplanation.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{
              padding: '16px 20px',
              background: `${moduleColor}10`,
              borderRadius: 14,
              border: `1px solid ${moduleColor}22`,
              marginBottom: 16,
              borderLeft: `4px solid ${moduleColor}`,
            }}
          >
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: moduleColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
              Found: {activeExplanation.label}
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--bark-soft)', lineHeight: 1.55 }}>
              {activeExplanation.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Found list */}
      {found.size > 0 && !activeExplanation && (
        <div style={{ marginBottom: 20 }}>
          {lesson.spotIssues?.filter(i => found.has(i.id)).map(issue => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                display: 'flex',
                gap: 8,
                alignItems: 'flex-start',
                padding: '10px 14px',
                background: `${moduleColor}06`,
                borderRadius: 10,
                marginBottom: 6,
                border: `1px solid ${moduleColor}15`,
              }}
            >
              <span style={{ color: moduleColor, fontWeight: 700, flexShrink: 0 }}>✓</span>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: moduleColor, display: 'block', marginBottom: 2 }}>{issue.label}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--bark-muted)' }}>{issue.explanation}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {allFound ? (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
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
          All issues found! Continue →
        </motion.button>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '14px',
          background: 'var(--cream-2)',
          borderRadius: 14,
          fontSize: '0.875rem',
          color: 'var(--bark-muted)',
        }}>
          Tap the <span style={{ color: '#E05C3A', fontWeight: 700 }}>!</span> markers to find all {lesson.spotIssues?.length} issues
        </div>
      )}
    </motion.div>
  )
}
