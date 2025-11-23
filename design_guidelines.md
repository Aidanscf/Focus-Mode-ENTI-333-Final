# FocusMode Design Guidelines

## Design Approach
**System**: Apple HIG-inspired with athletic refinement
**Rationale**: Content-focused minimalism supports mental clarity and focus—essential for pre-match preparation. Clean hierarchy and generous whitespace create calm, distraction-free environments for both data entry and meditation experiences.

## Core Design Principles
1. **Calm Authority**: Professional, trustworthy interface that instills confidence
2. **Clarity Over Decoration**: Every element serves the athlete's mental preparation
3. **Progressive Disclosure**: Complex forms broken into digestible, focused steps
4. **Meditation-Ready**: Routine output pages designed for immersive focus

## Typography
- **Primary Font**: Inter (Google Fonts) - clean, highly legible for forms and data
- **Display/Headers**: Poppins (Google Fonts) - friendly authority for section titles
- **Hierarchy**:
  - Page Headers: text-4xl/5xl font-bold (Poppins)
  - Section Titles: text-2xl/3xl font-semibold (Poppins)
  - Body/Forms: text-base/lg (Inter)
  - Mantras/Quotes: text-3xl/4xl font-medium italic (Poppins)
  - Metadata: text-sm text-gray-600

## Layout System
**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20
- Form sections: p-8, gap-6
- Card padding: p-6
- Component spacing: space-y-8 for vertical rhythm
- Container max-width: max-w-4xl for forms, max-w-6xl for dashboards

## Component Library

### Navigation
- Minimal top navigation: Logo left, "Profile" and "History" links right
- Sticky header with subtle shadow on scroll
- Mobile: Hamburger menu with slide-out drawer

### Forms (Athlete Setup, Match-Day Check-In)
- **Multi-step Progress**: Horizontal progress dots/lines showing current step
- **Input Fields**: Large touch targets (min-h-12), rounded-lg borders, clear labels above inputs
- **Strategy Template**: Numbered list (1-5) with textarea for each field, placeholder text showing examples
- **Mood Selection**: Chip buttons (rounded-full, interactive states)
- **Sliders**: Custom styled with large thumb, track showing value
- **Primary CTA**: Large (h-14), rounded-xl, full-width on mobile, fixed at bottom with backdrop blur

### Routine Output Page (Immersive Experience)
- **Hero Section**: Full-width gradient background, centered mantra in display type
- **Audio Player**: 
  - Centered card with play/pause (large circular button)
  - Progress bar with time indicators
  - Waveform visualization (subtle, decorative)
  - Controls: Replay, Download options
- **Routine Sections**: Stacked cards with icons (breathing, strategy, nutrition, motivation)
- **Hydration/Carb Cards**: Side-by-side on desktop, visual icons (water drop, wheat)
- **Strategy Bullets**: Clean list with checkmarks, emphasis on coach reminders

### Routine History Dashboard
- **Card Grid**: 2-column on desktop (grid-cols-1 md:grid-cols-2)
- **History Cards**: 
  - Date/timestamp prominent
  - Opponent name as subtitle
  - Truncated routine preview
  - "View Routine" CTA
  - Hover: Subtle lift (shadow-lg)

### Knowledge Articles
- **Article Grid**: 3-column cards (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- **Article Cards**: 
  - Icon at top
  - Title + brief description
  - "Read More" link
  - Background: subtle gradient or image
- **Article Page**: Single column, max-w-prose, generous line-height for readability

### Icons
- **Library**: Heroicons (outline for general UI, solid for active states)
- **Usage**: Breathing (wind icon), Strategy (clipboard), Nutrition (beaker), Meditation (sparkles)

## Images
- **Hero Images**: Not required for MVP forms—focus on clean, functional design
- **Knowledge Articles**: Header images for each article (athletes in meditation/focus poses, abstract calm imagery)
- **Routine Cards**: Optional icon illustrations for breathing/visualization sections
- **Profile/Empty States**: Motivational imagery (athlete in starting position, sunrise/stadium)

## Animations
**Minimal and purposeful only:**
- Form step transitions: Slide fade (300ms ease-out)
- Audio player: Pulse on play button when active
- Page transitions: Subtle fade (200ms)
- **No autoplay, no distracting micro-interactions**

## Page-Specific Layouts

### Home/Dashboard
- Welcome header with athlete name
- Quick action: "Start Pre-Match Routine" (prominent CTA)
- Recent routines grid below
- Bottom navigation to Knowledge/Profile

### Athlete Setup (Multi-Step)
- Progress indicator at top
- Single focused question per screen
- Back/Next navigation at bottom
- Save progress automatically

### Match-Day Form
- Opponent info section (text inputs)
- Strategy template (5 numbered textareas with helper text)
- Current state (mood chips, energy slider, hydration input)
- "Generate Routine" CTA (prominent, disabled until form complete)

### Routine Output
- Immersive mantra hero (viewport height on mobile)
- Audio player card (elevated, central focus)
- Routine sections stacked with breathing room (py-12 between sections)
- Hydration/nutrition cards side-by-side
- Strategy reminders in highlighted box
- Actions footer: Save, Share, Return Home

### Knowledge Base
- Grid of article cards
- Search/filter by topic (future enhancement placeholder)
- Clean article reading experience

## Visual Treatment Notes
- Avoid harsh athletics aesthetics (no aggressive angles, heavy shadows)
- Gradients: Subtle, calming (blue-to-purple, soft transitions)
- Shadows: Minimal elevation (shadow-sm to shadow-md)
- Borders: Soft (border-gray-200), rounded corners throughout
- Focus states: Clear, accessible (ring-2 ring-blue-500)