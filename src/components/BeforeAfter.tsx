import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { Lesson } from '../data/lessons'

interface BeforeAfterProps {
  lesson: Lesson
  moduleColor: string
  lessonId: string
  onComplete: () => void
}

function getBeforeContent(lessonId: string) {
  if (lessonId === 'vh-before-after') {
    return (
      <div style={{ padding: 24, background: '#F8F4EE', height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ fontSize: 14, fontWeight: 400, color: '#555' }}>Welcome to our product</p>
        <p style={{ fontSize: 14, fontWeight: 400, color: '#555' }}>We help teams ship faster</p>
        <button style={{ fontSize: 13, padding: '8px 14px', background: '#888', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', width: 'fit-content' }}>
          Get Started
        </button>
        <p style={{ fontSize: 14, fontWeight: 400, color: '#555' }}>Trusted by 10,000 teams</p>
        <p style={{ fontSize: 13, color: '#888' }}>No credit card required</p>
      </div>
    )
  }
  if (lessonId === 'ws-before-after') {
    return (
      <div style={{ padding: 8, background: '#F0EBE4', height: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ background: '#C4742A', color: 'white', padding: '6px 8px', fontSize: 11, fontWeight: 700 }}>Brand Name</div>
        <div style={{ padding: '4px 8px', fontSize: 10, lineHeight: 1.3, color: '#333' }}>
          Our platform helps your team collaborate, communicate, and ship great products faster than ever before.
        </div>
        <div style={{ display: 'flex', gap: 3, padding: '0 8px' }}>
          <div style={{ flex: 1, background: '#E5DDD5', height: 60, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#666' }}>Feature 1</div>
          <div style={{ flex: 1, background: '#E5DDD5', height: 60, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#666' }}>Feature 2</div>
          <div style={{ flex: 1, background: '#E5DDD5', height: 60, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#666' }}>Feature 3</div>
        </div>
        <div style={{ padding: '3px 8px' }}>
          <button style={{ background: '#C4742A', color: 'white', border: 'none', padding: '4px 10px', fontSize: 9, borderRadius: 3, cursor: 'pointer', width: '100%' }}>Get Started Free</button>
        </div>
        <div style={{ padding: '2px 8px', fontSize: 9, color: '#777', lineHeight: 1.3 }}>
          Sign up for newsletter • Privacy policy • Terms • FAQ • Contact us
        </div>
      </div>
    )
  }
  if (lessonId === 'ge-before-after') {
    return (
      <div style={{ padding: 20, background: '#F8F4EE', height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ fontSize: 11, color: '#888', marginBottom: 0 }}>First Name</p>
        <input style={{ fontSize: 12, padding: '6px 10px', border: '1px solid #CCC', borderRadius: 6, background: 'white' }} placeholder="Jane" />
        <p style={{ fontSize: 11, color: '#888', marginBottom: 0 }}>Last Name</p>
        <input style={{ fontSize: 12, padding: '6px 10px', border: '1px solid #CCC', borderRadius: 6, background: 'white' }} placeholder="Doe" />
        <p style={{ fontSize: 11, color: '#888', marginBottom: 0 }}>Email</p>
        <input style={{ fontSize: 12, padding: '6px 10px', border: '1px solid #CCC', borderRadius: 6, background: 'white' }} placeholder="jane@example.com" />
        <p style={{ fontSize: 11, color: '#888', marginBottom: 0 }}>Phone</p>
        <input style={{ fontSize: 12, padding: '6px 10px', border: '1px solid #CCC', borderRadius: 6, background: 'white' }} placeholder="+1 555..." />
      </div>
    )
  }
  return (
    <div style={{ padding: 24, background: '#F8F4EE', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#999', fontSize: 13 }}>Before state</p>
    </div>
  )
}

function getAfterContent(lessonId: string) {
  if (lessonId === 'vh-before-after') {
    return (
      <div style={{ padding: 24, background: 'white', height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, color: '#1A1410', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Ship faster,<br />together.
        </h2>
        <p style={{ fontSize: 12, color: '#7A5C3E', lineHeight: 1.6, maxWidth: '90%' }}>
          We help teams collaborate and deliver great products.
        </p>
        <button style={{
          fontSize: 13,
          padding: '10px 22px',
          background: '#C4742A',
          color: 'white',
          border: 'none',
          borderRadius: 99,
          cursor: 'pointer',
          fontWeight: 700,
          width: 'fit-content',
          boxShadow: '0 4px 16px rgba(196,116,42,0.4)',
        }}>
          Get Started Free →
        </button>
        <p style={{ fontSize: 10, color: '#AAA' }}>No credit card required</p>
      </div>
    )
  }
  if (lessonId === 'ws-before-after') {
    return (
      <div style={{ padding: 24, background: 'white', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#C4742A', fontSize: 13, letterSpacing: '-0.01em' }}>Brand Name</div>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: '#1A1410', marginBottom: 6, lineHeight: 1.2 }}>
            Collaborate & ship fast
          </h3>
          <p style={{ fontSize: 10, color: '#7A5C3E', lineHeight: 1.65 }}>
            Your team, your tools, your way.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, background: '#FBF5EE', height: 52, borderRadius: 10, border: '1px solid rgba(196,116,42,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#C4742A', fontWeight: 700 }}>⚡ Fast</div>
          <div style={{ flex: 1, background: '#FBF5EE', height: 52, borderRadius: 10, border: '1px solid rgba(196,116,42,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#C4742A', fontWeight: 700 }}>🔒 Safe</div>
        </div>
        <button style={{ background: '#1A1410', color: 'white', border: 'none', padding: '9px 18px', fontSize: 10, fontWeight: 700, borderRadius: 99, cursor: 'pointer' }}>
          Start free trial →
        </button>
      </div>
    )
  }
  if (lessonId === 'ge-before-after') {
    return (
      <div style={{ padding: 20, background: 'white', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#7A5C3E', marginBottom: 4 }}>First Name</p>
          <input style={{ fontSize: 12, padding: '8px 10px', border: '1.5px solid #E8D5BE', borderRadius: 8, background: '#FDFAF7', width: '100%', outline: 'none' }} placeholder="Jane" />
        </div>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#7A5C3E', marginBottom: 4 }}>Last Name</p>
          <input style={{ fontSize: 12, padding: '8px 10px', border: '1.5px solid #E8D5BE', borderRadius: 8, background: '#FDFAF7', width: '100%', outline: 'none' }} placeholder="Doe" />
        </div>
        <div style={{ borderTop: '1px solid #F0E8DE', paddingTop: 16 }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#7A5C3E', marginBottom: 4 }}>Email</p>
            <input style={{ fontSize: 12, padding: '8px 10px', border: '1.5px solid #E8D5BE', borderRadius: 8, background: '#FDFAF7', width: '100%', outline: 'none' }} placeholder="jane@example.com" />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div style={{ padding: 24, background: 'white', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#999', fontSize: 13 }}>After state</p>
    </div>
  )
}

export function BeforeAfterLesson({ lesson, moduleColor, lessonId, onComplete }: BeforeAfterProps) {
  const [sliderX, setSliderX] = useState(80)
  const [isDragging, setIsDragging] = useState(false)
  const [interacted, setInteracted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    setSliderX(Math.max(5, Math.min(95, x)))
    setInteracted(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: 680, margin: '0 auto' }}
    >
      {/* Labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' }}>
        <span className="badge badge-coral">{lesson.beforeLabel}</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--bark-muted)' }}>← drag to compare →</span>
        <span className="badge badge-amber">{lesson.afterLabel}</span>
      </div>

      {/* Slider container */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: 320,
          borderRadius: 20,
          overflow: 'hidden',
          cursor: 'col-resize',
          userSelect: 'none',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid rgba(44,26,14,0.08)',
        }}
        onMouseDown={(e) => { setIsDragging(true); updateSlider(e.clientX) }}
        onMouseMove={(e) => { if (isDragging) updateSlider(e.clientX) }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={(e) => { setIsDragging(true); updateSlider(e.touches[0].clientX) }}
        onTouchMove={(e) => { if (isDragging) updateSlider(e.touches[0].clientX) }}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* Before panel (full — base layer, always on left) */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {getBeforeContent(lessonId)}
        </div>

        {/* After panel (clipped to right of slider — revealed by dragging left) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          clipPath: `polygon(${sliderX}% 0, 100% 0, 100% 100%, ${sliderX}% 100%)`,
          transition: isDragging ? 'none' : 'clip-path 0.05s',
        }}>
          {getAfterContent(lessonId)}
        </div>

        {/* Divider line */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${sliderX}%`,
          width: 2,
          background: moduleColor,
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}>
          {/* Handle */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: moduleColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 13,
            fontWeight: 700,
            boxShadow: `0 4px 16px ${moduleColor}55`,
            cursor: 'col-resize',
          }}>
            ⇔
          </div>
        </div>

        {/* Hint overlay */}
        {!interacted && (
          <motion.div
            animate={{ opacity: [0.8, 0.3, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <div style={{
              background: 'rgba(44,26,14,0.75)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: 99,
              fontSize: 12,
              fontWeight: 600,
              backdropFilter: 'blur(8px)',
            }}>
              👈 Drag to compare 👉
            </div>
          </motion.div>
        )}
      </div>

      {/* Descriptions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 20, marginBottom: 28 }}>
        <div style={{
          padding: '16px 20px',
          background: 'rgba(224,92,58,0.06)',
          borderRadius: 14,
          border: '1px solid rgba(224,92,58,0.15)',
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--coral)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Before</div>
          <p style={{ fontSize: 12, color: 'var(--bark-soft)', lineHeight: 1.55 }}>{lesson.beforeDescription}</p>
        </div>
        <div style={{
          padding: '16px 20px',
          background: `${moduleColor}08`,
          borderRadius: 14,
          border: `1px solid ${moduleColor}22`,
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: moduleColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>After</div>
          <p style={{ fontSize: 12, color: 'var(--bark-soft)', lineHeight: 1.55 }}>{lesson.afterDescription}</p>
        </div>
      </div>

      <motion.button
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
        I see the difference →
      </motion.button>
    </motion.div>
  )
}
