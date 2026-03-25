import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MODULES } from './data/lessons'
import type { AppView, UserProgress } from './data/lessons'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { ModuleGrid } from './components/ModuleGrid'
import { ModuleView } from './components/ModuleView'
import { LessonView } from './components/LessonView'
import { CompletionBurst } from './components/CompletionBurst'

const XP_PER_LESSON = 15

function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem('uxlab-progress')
    if (!raw) return { completedLessons: new Set(), xp: 0, streak: 1 }
    const parsed = JSON.parse(raw)
    return {
      completedLessons: new Set(parsed.completedLessons ?? []),
      xp: parsed.xp ?? 0,
      streak: parsed.streak ?? 1,
    }
  } catch {
    return { completedLessons: new Set(), xp: 0, streak: 1 }
  }
}

function saveProgress(p: UserProgress) {
  localStorage.setItem('uxlab-progress', JSON.stringify({
    completedLessons: [...p.completedLessons],
    xp: p.xp,
    streak: p.streak,
  }))
}

export default function App() {
  const [view, setView] = useState<AppView>({ screen: 'home' })
  const [progress, setProgress] = useState<UserProgress>(loadProgress)
  const [burst, setBurst] = useState<{ show: boolean; xp: number; color: string }>({
    show: false, xp: 0, color: '#C4742A',
  })

  const handleComplete = useCallback(() => {
    if (view.screen !== 'lesson') return
    const mod = MODULES.find(m => m.id === view.moduleId)!
    const isNew = !progress.completedLessons.has(view.lessonId)

    if (isNew) {
      const updated: UserProgress = {
        completedLessons: new Set([...progress.completedLessons, view.lessonId]),
        xp: progress.xp + XP_PER_LESSON,
        streak: progress.streak,
      }
      setProgress(updated)
      saveProgress(updated)
      setBurst({ show: true, xp: XP_PER_LESSON, color: mod.color })
    } else {
      // Already done — just go back
      setView({ screen: 'module', moduleId: view.moduleId })
    }
  }, [view, progress])

  const handleBurstDone = useCallback(() => {
    setBurst(b => ({ ...b, show: false }))
    if (view.screen === 'lesson') {
      const mod = MODULES.find(m => m.id === view.moduleId)!
      const lessonIndex = mod.lessons.findIndex(l => l.id === view.lessonId)
      const nextLesson = mod.lessons[lessonIndex + 1]
      if (nextLesson) {
        setView({ screen: 'lesson', moduleId: view.moduleId, lessonId: nextLesson.id })
      } else {
        setView({ screen: 'module', moduleId: view.moduleId })
      }
    }
  }, [view])

  const currentModule = view.screen !== 'home'
    ? MODULES.find(m => m.id === (view as { moduleId: string }).moduleId)
    : undefined

  const currentLesson = view.screen === 'lesson' && currentModule
    ? currentModule.lessons.find(l => l.id === view.lessonId)
    : undefined

  const lessonIndex = view.screen === 'lesson' && currentModule && currentLesson
    ? currentModule.lessons.indexOf(currentLesson)
    : 0

  return (
    <div className="gradient-bg" style={{ minHeight: '100vh' }}>
      <Nav
        progress={progress}
        onHome={() => setView({ screen: 'home' })}
        currentScreen={view.screen}
      />

      <AnimatePresence mode="wait">
        {view.screen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Hero
              modules={MODULES}
              progress={progress}
              onStart={() => {
                const firstIncomplete = MODULES.find(m =>
                  m.lessons.some(l => !progress.completedLessons.has(l.id))
                )
                if (firstIncomplete) {
                  setView({ screen: 'module', moduleId: firstIncomplete.id })
                } else {
                  setView({ screen: 'module', moduleId: MODULES[0].id })
                }
              }}
            />
            <ModuleGrid
              modules={MODULES}
              progress={progress}
              onSelectModule={(id) => setView({ screen: 'module', moduleId: id })}
            />
          </motion.div>
        )}

        {view.screen === 'module' && currentModule && (
          <motion.div
            key={`module-${view.moduleId}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ModuleView
              module={currentModule}
              progress={progress}
              onSelectLesson={(lessonId) =>
                setView({ screen: 'lesson', moduleId: currentModule.id, lessonId })
              }
              onBack={() => setView({ screen: 'home' })}
            />
          </motion.div>
        )}

        {view.screen === 'lesson' && currentModule && currentLesson && (
          <motion.div
            key={`lesson-${view.lessonId}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <LessonView
              module={currentModule}
              lesson={currentLesson}
              lessonIndex={lessonIndex}
              totalLessons={currentModule.lessons.length}
              progress={progress}
              onComplete={handleComplete}
              onBack={() => setView({ screen: 'module', moduleId: currentModule.id })}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <CompletionBurst
        show={burst.show}
        xpGained={burst.xp}
        moduleColor={burst.color}
        onDone={handleBurstDone}
      />
    </div>
  )
}
