import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Lesson } from '../data/lessons'

interface SpotIssueProps {
  lesson: Lesson
  moduleColor: string
  onComplete: () => void
}

interface ContrastIssue {
  id: string
  label: string
  severity: 'critical' | 'warning'
  problem: string
  fix: string
  ratio?: string
}

// ── Issues per lesson ────────────────────────────────────────────────────────

const ISSUES_MAP: Record<string, ContrastIssue[]> = {
  'col-spot': [
    {
      id: 'grey-on-white',
      label: 'Grey text on white',
      severity: 'critical',
      problem: 'Light grey (#BBBBBB) on white gives a contrast ratio of only 2.3:1 — well below the WCAG AA minimum of 4.5:1.',
      fix: 'Darken the text to at least #767676 (4.5:1) or use #555 for comfortable reading.',
      ratio: '2.3:1',
    },
    {
      id: 'yellow-on-yellow',
      label: 'Yellow text on pale yellow',
      severity: 'critical',
      problem: 'Bright yellow (#FFEB3B) on a pale yellow background (#FFFDE7) produces a contrast ratio below 1.1:1 — almost invisible.',
      fix: 'Use a dark amber like #6D4C00 on that background, or use white/dark text on a solid amber background.',
      ratio: '1.1:1',
    },
    {
      id: 'white-on-pink',
      label: 'White text on pale pink',
      severity: 'critical',
      problem: 'White text on a light pink (#FFE0E0) background is nearly unreadable — contrast ratio is ≈ 1.05:1.',
      fix: 'Switch to a dark red like #C62828 on the pink background, or use white text on a saturated red (#D32F2F).',
      ratio: '1.05:1',
    },
    {
      id: 'placeholder-label',
      label: 'Placeholder used as label',
      severity: 'warning',
      problem: 'Placeholder text disappears the moment a user starts typing. If it\'s the only label, users lose context mid-input.',
      fix: 'Add a persistent label above the input. Keep the placeholder as a hint, not the sole identifier.',
      ratio: undefined,
    },
  ],
  'ws-spot': [
    {
      id: 'text-edge',
      label: 'Text touching container edge',
      severity: 'critical',
      problem: 'The nav text has no left padding — it sits flush against the edge. This creates a cramped, unfinished feel.',
      fix: 'Apply at least 16px horizontal padding to all container edges.',
    },
    {
      id: 'no-section-gap',
      label: 'No space between sections',
      severity: 'critical',
      problem: 'The hero and features sections are directly adjacent with zero gap between them. The eye can\'t tell where one section ends and another begins.',
      fix: 'Add 48–64px of vertical space between distinct content sections.',
    },
    {
      id: 'icon-overlap',
      label: 'Icon overlaps text',
      severity: 'warning',
      problem: 'The lock icon in the "Secure" card overlaps its label, creating visual confusion and an amateur look.',
      fix: 'Ensure at least 8px of clearance between any icon and adjacent text.',
    },
    {
      id: 'button-crowded',
      label: 'Button too close to body copy',
      severity: 'warning',
      problem: 'The CTA button has only 2px of margin from the text above it. It doesn\'t feel like a primary action — it blends into the copy.',
      fix: 'Give CTAs at least 24px of vertical breathing room from surrounding content.',
    },
  ],
}

// ── Mock screens with highlight support ─────────────────────────────────────

function ColSpotMock({ highlight }: { highlight: boolean }) {
  const hl = (id: string): React.CSSProperties =>
    highlight
      ? { outline: '2px solid rgba(220, 38, 38, 0.7)', outlineOffset: 2, borderRadius: 4 }
      : {}

  return (
    <div style={{ width: '100%', height: '100%', background: 'white', fontSize: 11 }}>
      <div style={{ background: '#F8F8F8', padding: '10px 12px', borderBottom: '1px solid #EEE' }}>
        <span style={{ fontWeight: 700, color: '#333' }}>Dashboard</span>
      </div>

      {/* Issue 1: grey on white */}
      <div style={{ padding: '12px 12px 8px', ...hl('grey-on-white') }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#BBBBBB' }}>Recent Activity</p>
        <p style={{ fontSize: 10, color: '#CCCCCC', lineHeight: 1.4 }}>
          You have no recent activity to display. Check back later for updates.
        </p>
      </div>

      {/* Issue 2: yellow on yellow */}
      <div style={{ padding: '0 12px 10px' }}>
        <div style={{
          background: '#FFFDE7',
          padding: '8px 10px',
          borderRadius: 8,
          border: '1px solid #FFF9C4',
          ...hl('yellow-on-yellow'),
        }}>
          <p style={{ color: '#FFEB3B', fontWeight: 700, fontSize: 11 }}>⚠ Important Notice</p>
          <p style={{ color: '#FFF176', fontSize: 9 }}>Your subscription expires in 3 days.</p>
        </div>
      </div>

      {/* Issue 3: white on pale pink */}
      <div style={{ padding: '0 12px 10px' }}>
        <div style={{ background: '#FFE0E0', padding: '8px 10px', borderRadius: 8, ...hl('white-on-pink') }}>
          <p style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 11 }}>Error occurred</p>
          <p style={{ color: '#FFFFFF', fontSize: 9 }}>Please try again later</p>
        </div>
      </div>

      {/* Issue 4: placeholder as label */}
      <div style={{ padding: '0 12px', ...hl('placeholder-label') }}>
        <input
          style={{
            width: '100%',
            padding: '8px 10px',
            border: '1px solid #E0E0E0',
            borderRadius: 6,
            fontSize: 10,
            color: '#AAAAAA',
            background: 'white',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          placeholder="Email address"
          readOnly
        />
      </div>
    </div>
  )
}

function WsSpotMock({ highlight }: { highlight: boolean }) {
  const hl = (id: string): React.CSSProperties =>
    highlight
      ? { outline: '2px solid rgba(220, 38, 38, 0.7)', outlineOffset: 2, borderRadius: 4 }
      : {}

  return (
    <div style={{ width: '100%', height: '100%', background: '#F0EBE4', fontSize: 11 }}>
      {/* Issue 1: text at edge */}
      <div style={{
        background: '#C4742A',
        padding: '10px 0',
        display: 'flex',
        alignItems: 'center',
        ...hl('text-edge'),
      }}>
        <span style={{ color: 'white', fontWeight: 700, fontSize: 13, marginLeft: 4 }}>BrandName</span>
        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10, marginLeft: 'auto', marginRight: 8 }}>Menu</span>
      </div>

      {/* Issue 2: no section gap */}
      <div style={{ ...hl('no-section-gap') }}>
        <div style={{ padding: '10px 8px', background: 'white' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1410', marginBottom: 2 }}>Welcome to Our Platform</p>
          <p style={{ fontSize: 10, color: '#888', lineHeight: 1.3 }}>We help teams ship great products faster.</p>
        </div>
        <div style={{ padding: '10px 8px', background: '#F8F4EE' }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#333', marginBottom: 4 }}>Our Features</p>
          <div style={{ display: 'flex', gap: 4 }}>
            <div style={{ flex: 1, background: '#EDE0CF', padding: '6px 4px', borderRadius: 4, fontSize: 9, color: '#555', textAlign: 'center' }}>⚡ Fast</div>
            {/* Issue 3: icon overlap */}
            <div style={{ flex: 1, background: '#EDE0CF', padding: '6px 4px', borderRadius: 4, fontSize: 9, color: '#555', position: 'relative', ...hl('icon-overlap') }}>
              <div style={{ fontSize: 12, position: 'absolute', top: 2, left: 20 }}>🔒</div>
              <div style={{ marginTop: 2 }}>Secure</div>
            </div>
            <div style={{ flex: 1, background: '#EDE0CF', padding: '6px 4px', borderRadius: 4, fontSize: 9, color: '#555', textAlign: 'center' }}>📊 Analytics</div>
          </div>
        </div>
      </div>

      {/* Issue 4: button too close */}
      <div style={{ padding: '6px 8px', background: 'white', ...hl('button-crowded') }}>
        <p style={{ fontSize: 9, color: '#888', marginBottom: 2 }}>Ready to get started? Sign up today!</p>
        <button style={{ background: '#C4742A', color: 'white', border: 'none', padding: '5px 12px', fontSize: 9, borderRadius: 4, cursor: 'default', marginTop: 1 }}>
          Get Started Free
        </button>
      </div>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export function SpotIssueLesson({ lesson, moduleColor, onComplete }: SpotIssueProps) {
  const [highlightsOn, setHighlightsOn] = useState(true)
  const issues = ISSUES_MAP[lesson.id] ?? []

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: 680, margin: '0 auto' }}
    >
      {/* Mock screen + toggle */}
      <div style={{ marginBottom: 28 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--bark-muted)', letterSpacing: '0.04em' }}>
            Live Example
          </span>

          {/* Toggle */}
          <button
            onClick={() => setHighlightsOn(h => !h)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              background: highlightsOn ? 'rgba(220,38,38,0.08)' : 'var(--cream-2)',
              border: `1.5px solid ${highlightsOn ? 'rgba(220,38,38,0.25)' : 'rgba(44,26,14,0.1)'}`,
              borderRadius: 99,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: highlightsOn ? 'rgb(185,28,28)' : 'var(--bark-muted)',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: highlightsOn ? 'rgb(220,38,38)' : 'var(--cream-3)',
              transition: 'background 0.2s',
              flexShrink: 0,
            }} />
            {highlightsOn ? 'Highlights on' : 'Highlights off'}
          </button>
        </div>

        <div style={{
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid rgba(44,26,14,0.08)',
          minHeight: 260,
        }}>
          {lesson.id === 'col-spot' && <ColSpotMock highlight={highlightsOn} />}
          {lesson.id === 'ws-spot' && <WsSpotMock highlight={highlightsOn} />}
        </div>
      </div>

      {/* Issues list */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--bark-muted)', marginBottom: 12 }}>
          {issues.length} Issues Found
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {issues.map((issue, i) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'white',
                borderRadius: 16,
                border: '1px solid rgba(44,26,14,0.07)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Issue header */}
              <div style={{
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                borderBottom: '1px solid rgba(44,26,14,0.05)',
              }}>
                {/* Severity dot */}
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: issue.severity === 'critical' ? 'rgb(220,38,38)' : '#F59E0B',
                  flexShrink: 0,
                  boxShadow: issue.severity === 'critical'
                    ? '0 0 0 3px rgba(220,38,38,0.15)'
                    : '0 0 0 3px rgba(245,158,11,0.15)',
                }} />

                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--bark)',
                  flex: 1,
                }}>
                  {issue.label}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {issue.ratio && (
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      background: 'rgba(220,38,38,0.08)',
                      color: 'rgb(185,28,28)',
                      borderRadius: 99,
                      border: '1px solid rgba(220,38,38,0.15)',
                    }}>
                      {issue.ratio}
                    </span>
                  )}
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    background: issue.severity === 'critical'
                      ? 'rgba(220,38,38,0.07)'
                      : 'rgba(245,158,11,0.08)',
                    color: issue.severity === 'critical' ? 'rgb(185,28,28)' : '#92400E',
                    borderRadius: 99,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}>
                    {issue.severity}
                  </span>
                </div>
              </div>

              {/* Problem + Fix */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                <div style={{ padding: '14px 18px', borderRight: '1px solid rgba(44,26,14,0.05)' }}>
                  <div style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'rgb(185,28,28)',
                    marginBottom: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                    <span>✕</span> What's wrong
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--bark-soft)', lineHeight: 1.55 }}>
                    {issue.problem}
                  </p>
                </div>

                <div style={{ padding: '14px 18px' }}>
                  <div style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: moduleColor,
                    marginBottom: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                    <span>✓</span> How to fix
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--bark-soft)', lineHeight: 1.55 }}>
                    {issue.fix}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Continue */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: issues.length * 0.07 + 0.2 }}
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
        I understand these issues →
      </motion.button>
    </motion.div>
  )
}
