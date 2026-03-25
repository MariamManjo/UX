export type LessonType = 'theory' | 'before-after' | 'spot-issue' | 'quiz' | 'arrange'

export interface QuizOption {
  id: string
  text: string
  correct: boolean
  explanation: string
}

export interface SpotIssue {
  id: string
  label: string
  x: number // percentage
  y: number // percentage
  explanation: string
}

export interface Lesson {
  id: string
  type: LessonType
  title: string
  subtitle: string
  duration: string
  // Theory
  principle?: string
  description?: string
  visualType?: 'hierarchy' | 'whitespace' | 'typography' | 'color' | 'contrast' | 'fpattern' | 'gestalt'
  // Before/After
  beforeLabel?: string
  afterLabel?: string
  beforeDescription?: string
  afterDescription?: string
  // Spot Issue
  spotIssues?: SpotIssue[]
  spotBackground?: string
  // Quiz
  question?: string
  options?: QuizOption[]
}

export interface Module {
  id: string
  number: number
  title: string
  tagline: string
  emoji: string
  color: string
  accentColor: string
  lessons: Lesson[]
  xpReward: number
}

export const MODULES: Module[] = [
  {
    id: 'visual-hierarchy',
    number: 1,
    title: 'Visual Hierarchy',
    tagline: 'Guide the eye. Control attention.',
    emoji: '👁',
    color: '#C4742A',
    accentColor: '#F4E6D4',
    xpReward: 150,
    lessons: [
      {
        id: 'vh-theory',
        type: 'theory',
        title: 'The Eye Follows Order',
        subtitle: 'Size, weight & contrast create invisible paths',
        duration: '2 min',
        principle: 'The brain ranks information by visual weight before reading a single word.',
        description: 'Visual hierarchy is the arrangement of elements so that the eye naturally travels in a meaningful sequence. The biggest, boldest, most contrasting element wins attention first — every time.',
        visualType: 'hierarchy',
      },
      {
        id: 'vh-before-after',
        type: 'before-after',
        title: 'Before vs After',
        subtitle: 'See hierarchy in action',
        duration: '3 min',
        beforeLabel: 'No Hierarchy',
        afterLabel: 'Clear Hierarchy',
        beforeDescription: 'Every element fights for attention. Same font size, same weight — your eye has nowhere to land.',
        afterDescription: 'One large heading leads, supporting text follows, CTA anchors the bottom. The eye flows naturally top to bottom.',
      },
      {
        id: 'vh-quiz',
        type: 'quiz',
        title: 'Quick Check',
        subtitle: 'Test your eye',
        duration: '1 min',
        question: 'A landing page has a headline, body text, and a CTA button — all the same size and weight. What is the FIRST thing to fix?',
        options: [
          {
            id: 'a',
            text: 'Add more text to explain the product better',
            correct: false,
            explanation: 'More text makes the problem worse — it adds noise without guiding the eye.',
          },
          {
            id: 'b',
            text: 'Make the headline significantly larger and bolder',
            correct: true,
            explanation: 'Correct! A dominant headline instantly establishes hierarchy and gives the eye a clear entry point.',
          },
          {
            id: 'c',
            text: 'Change the background color',
            correct: false,
            explanation: 'Background color won\'t fix flat hierarchy — the elements still compete equally.',
          },
          {
            id: 'd',
            text: 'Use a different font family',
            correct: false,
            explanation: 'Font family alone doesn\'t create hierarchy — size, weight and contrast do.',
          },
        ],
      },
    ],
  },
  {
    id: 'white-space',
    number: 2,
    title: 'White Space',
    tagline: 'Empty space is not wasted space.',
    emoji: '◻',
    color: '#7A5C3E',
    accentColor: '#F0E8DE',
    xpReward: 120,
    lessons: [
      {
        id: 'ws-theory',
        type: 'theory',
        title: 'Space Is a Design Element',
        subtitle: 'What you leave out matters as much as what you put in',
        duration: '2 min',
        principle: 'White space reduces cognitive load and makes content feel premium, trustworthy, and focused.',
        description: 'Negative space — the empty areas between and around elements — does active work. It groups related items, separates unrelated ones, and gives the eye room to rest. Cluttered interfaces feel cheap. Spacious ones feel premium.',
        visualType: 'whitespace',
      },
      {
        id: 'ws-before-after',
        type: 'before-after',
        title: 'Breathe vs Suffocate',
        subtitle: 'Feel the difference',
        duration: '3 min',
        beforeLabel: 'Cluttered',
        afterLabel: 'Breathing',
        beforeDescription: 'Padding: 8px everywhere. Elements crowd each other. Reading feels like a chore.',
        afterDescription: 'Generous padding (32–48px). Content groups clearly. Premium, effortless reading.',
      },
      {
        id: 'ws-spot',
        type: 'spot-issue',
        title: 'Find the Issues',
        subtitle: 'Tap every spacing problem you can spot',
        duration: '3 min',
        spotIssues: [
          { id: 'a', label: 'Text touching edge', x: 4, y: 12, explanation: 'Text should never touch the container edge — minimum 16px padding on all sides.' },
          { id: 'b', label: 'No gap between sections', x: 50, y: 45, explanation: 'Sections need at least 48–64px vertical space between them to feel distinct.' },
          { id: 'c', label: 'Icon overlaps text', x: 82, y: 72, explanation: 'Elements need at least 8px clearance. Overlap creates confusion and feels amateur.' },
          { id: 'd', label: 'Button too close to copy', x: 30, y: 85, explanation: 'A CTA button needs 24px+ of breathing room from surrounding text.' },
        ],
      },
    ],
  },
  {
    id: 'typography',
    number: 3,
    title: 'Typography',
    tagline: 'Type is the voice of your interface.',
    emoji: 'Aa',
    color: '#9A5518',
    accentColor: '#FAEEDD',
    xpReward: 140,
    lessons: [
      {
        id: 'ty-theory',
        type: 'theory',
        title: 'Type Carries Personality',
        subtitle: 'Every font choice sends a signal',
        duration: '2 min',
        principle: 'Readability is not optional — if users have to work to read, they stop reading.',
        description: 'Typography is 95% of design. Line height, letter spacing, font size, and contrast all affect how easily users can absorb your content. Optimal body text: 16–18px, line height 1.5–1.7, max 65–75 characters per line.',
        visualType: 'typography',
      },
      {
        id: 'ty-quiz',
        type: 'quiz',
        title: 'Type Rules',
        subtitle: 'Which is correct?',
        duration: '1 min',
        question: 'What is the ideal line length for comfortable body text reading?',
        options: [
          { id: 'a', text: '20–30 characters per line', correct: false, explanation: 'Too short — causes too many line breaks, disrupting the reading flow.' },
          { id: 'b', text: '65–75 characters per line', correct: true, explanation: 'Correct! This range optimizes eye movement and reduces strain. Use max-width: 65ch in CSS.' },
          { id: 'c', text: '100–120 characters per line', correct: false, explanation: 'Too wide — the eye struggles to find the next line start, causing reading fatigue.' },
          { id: 'd', text: 'Full container width always', correct: false, explanation: 'Never. Full-width text on large screens destroys readability.' },
        ],
      },
    ],
  },
  {
    id: 'color',
    number: 4,
    title: 'Color & Contrast',
    tagline: 'Contrast is an accessibility issue.',
    emoji: '◑',
    color: '#C4742A',
    accentColor: '#FEF0E0',
    xpReward: 160,
    lessons: [
      {
        id: 'col-theory',
        type: 'theory',
        title: 'Color Does Work',
        subtitle: 'Signal, guide, differentiate — then decorate',
        duration: '2 min',
        principle: 'Never use color alone to convey meaning — 8% of men have color vision deficiency.',
        description: 'Color communicates before users read. Red means danger. Green means go. But contrast ratio is the real game: WCAG requires 4.5:1 for normal text. Most designers fail this. Check every text-background pair you design.',
        visualType: 'color',
      },
      {
        id: 'col-spot',
        type: 'spot-issue',
        title: 'Contrast Problems',
        subtitle: 'Find every contrast failure',
        duration: '4 min',
        spotIssues: [
          { id: 'a', label: 'Light grey on white', x: 20, y: 20, explanation: 'Light grey text on white (#999 on #FFF) fails WCAG AA — ratio is only 2.85:1. Minimum is 4.5:1.' },
          { id: 'b', label: 'Yellow text on white', x: 60, y: 35, explanation: 'Yellow on white is nearly invisible. Contrast ratio often < 1.5:1. Never do this.' },
          { id: 'c', label: 'White text on pale bg', x: 40, y: 65, explanation: 'White text on light backgrounds fails for most users and completely fails those with low vision.' },
          { id: 'd', label: 'Placeholder-as-label', x: 75, y: 80, explanation: 'Placeholder text disappears when users type — it should never be the only label.' },
        ],
      },
      {
        id: 'col-quiz',
        type: 'quiz',
        title: 'Contrast Rule',
        subtitle: 'WCAG basics',
        duration: '1 min',
        question: 'What is the minimum contrast ratio required by WCAG AA for normal body text?',
        options: [
          { id: 'a', text: '2:1', correct: false, explanation: 'This is far too low — text would be hard to read for most users.' },
          { id: 'b', text: '3:1', correct: false, explanation: 'This is the minimum for large text (18pt+) but not for body text.' },
          { id: 'c', text: '4.5:1', correct: true, explanation: 'Correct! 4.5:1 is the WCAG AA standard for normal text. Use a tool like Who Can Use to check.' },
          { id: 'd', text: '7:1', correct: false, explanation: '7:1 is the WCAG AAA standard — stricter, but not the minimum.' },
        ],
      },
    ],
  },
  {
    id: 'feedback',
    number: 5,
    title: 'Feedback & States',
    tagline: 'Every action deserves a reaction.',
    emoji: '⚡',
    color: '#E05C3A',
    accentColor: '#FDEEE8',
    xpReward: 130,
    lessons: [
      {
        id: 'fb-theory',
        type: 'theory',
        title: 'Interfaces Must Speak',
        subtitle: 'If nothing changes, users assume it broke',
        duration: '2 min',
        principle: 'Feedback closes the loop between action and result. No feedback = confusion.',
        description: 'Every interactive element needs visible states: default, hover, active/pressed, disabled, loading, success, error. Buttons that don\'t react feel broken. Forms that submit silently feel scary. Loading states that explain nothing feel frustrating.',
        visualType: 'contrast',
      },
      {
        id: 'fb-quiz',
        type: 'quiz',
        title: 'State Awareness',
        subtitle: 'Which response is best?',
        duration: '1 min',
        question: 'A user submits a form. The network request takes 3 seconds. What should the UI do?',
        options: [
          { id: 'a', text: 'Nothing — wait for the response to arrive', correct: false, explanation: 'Silence = broken in the user\'s mind. They\'ll likely submit again, causing duplicates.' },
          { id: 'b', text: 'Show a spinner and disable the submit button immediately', correct: true, explanation: 'Correct! Immediate feedback (within 100ms) tells users their action was received. Disabling prevents double-submit.' },
          { id: 'c', text: 'Show a modal asking "Are you sure?"', correct: false, explanation: 'This interrupts the flow unnecessarily. Confirmation is for destructive actions, not form submission.' },
          { id: 'd', text: 'Redirect to a loading page', correct: false, explanation: 'Leaving the context adds friction and anxiety. Keep the user on the page when possible.' },
        ],
      },
    ],
  },
  {
    id: 'gestalt',
    number: 6,
    title: 'Gestalt Laws',
    tagline: 'The brain groups before it reads.',
    emoji: '◉',
    color: '#D4A853',
    accentColor: '#FDF5E0',
    xpReward: 180,
    lessons: [
      {
        id: 'ge-theory',
        type: 'theory',
        title: 'Laws of Perception',
        subtitle: 'How the brain organizes visual chaos',
        duration: '3 min',
        principle: 'Proximity, similarity, and closure happen automatically — design with them, not against them.',
        description: 'Gestalt psychology explains how humans perceive groups, patterns, and wholes. Six laws govern UI layout: Proximity (close = related), Similarity (same style = same type), Closure (the brain completes shapes), Continuity (smooth paths over sharp), Figure/Ground (foreground vs background), and Common Fate (moving together = belonging together).',
        visualType: 'gestalt',
      },
      {
        id: 'ge-before-after',
        type: 'before-after',
        title: 'Grouping in Action',
        subtitle: 'Proximity changes everything',
        duration: '3 min',
        beforeLabel: 'Broken Grouping',
        afterLabel: 'Gestalt Grouping',
        beforeDescription: 'Labels and inputs are evenly spaced — the eye can\'t tell which label belongs to which field.',
        afterDescription: 'Labels sit close to their input (8px gap), with 32px between groups. Proximity does the work.',
      },
    ],
  },
]

export type AppView =
  | { screen: 'home' }
  | { screen: 'module'; moduleId: string }
  | { screen: 'lesson'; moduleId: string; lessonId: string }

export interface UserProgress {
  completedLessons: Set<string>
  xp: number
  streak: number
}
