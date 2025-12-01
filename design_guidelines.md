# FocusMode Design Guidelines

## Design Approach
**System**: Apple HIG-inspired with meditative refinement
**Rationale**: FocusMode bridges athletic performance and mindfulness practice. The interface creates sanctuary—a calm mental space where athletes transition from external chaos to internal focus. Soft gradients and breathable layouts support the psychological shift from preparation to presence.

## Core Design Principles
1. **Sanctuary First**: Every screen feels like entering a peaceful mental space
2. **Breath and Rhythm**: Generous whitespace mirrors breathing exercises—natural pauses between content
3. **Gentle Authority**: Trustworthy guidance delivered with serenity, not urgency
4. **Progressive Calm**: Each step deeper into the experience increases tranquility

## Color Palette
**Background Gradients**: Soft, multi-directional gradients throughout (from top-left to bottom-right)
- **Primary**: Soft blue (#E8F4F8) to lavender (#F3F0FF) 
- **Secondary**: Pale teal (#E0F7F4) to warm cream (#FFF8F0)
- **Meditation Spaces**: Deep twilight blue (#1E3A5F) to soft purple (#4A3B5C)

**Interactive Elements**:
- Primary CTA: Soft teal (#5DCCCC) with 10% white overlay
- Secondary CTA: Lavender (#A78BFA) with subtle glow
- Text on gradients: Deep navy (#1E293B) for contrast, warm gray (#78716C) for secondary

**Component Backgrounds**: 
- Cards: White with 70% opacity over gradients (backdrop-blur-sm)
- Input fields: White with 80% opacity, soft shadow
- Audio player: White with 90% opacity, elevated shadow

## Typography
- **Primary**: Inter (body, forms, data)
- **Display**: Poppins (headers, mantras)
- **Hierarchy**:
  - Mantras/Hero: text-5xl/6xl font-light tracking-wide (Poppins)
  - Page Headers: text-3xl/4xl font-semibold (Poppins)
  - Section Titles: text-xl/2xl font-medium (Poppins)
  - Body: text-base/lg leading-relaxed (Inter)
  - Metadata: text-sm text-gray-500

## Layout System
**Spacing**: Tailwind units of 6, 8, 12, 16, 20, 24
- Section padding: py-16 md:py-24 for breathing room
- Card padding: p-8 md:p-12
- Component gaps: space-y-12 for vertical rhythm
- Containers: max-w-3xl for forms, max-w-5xl for dashboards

## Component Library

### Navigation
- Translucent header (backdrop-blur-lg, white 60% opacity)
- Logo left, Profile/History right in soft navy
- Mobile: Full-screen overlay menu with gradient background

### Forms (Multi-Step)
- Progress dots: Filled soft teal, unfilled white outline
- Input fields: Large (h-14), rounded-2xl, white 80% background
- Labels: Above inputs, text-sm font-medium, warm gray
- Textareas: min-h-32, same styling as inputs
- Mood chips: Rounded-full, soft teal when selected, white outline when not
- Sliders: Teal track with white thumb, large touch area
- Primary CTA: Fixed bottom on mobile with backdrop-blur, rounded-2xl, h-16

### Routine Output (Immersive)
- Hero: Full-viewport gradient (twilight blue to purple), centered mantra in ultra-light display type
- Audio Player Card:
  - Central elevated card (shadow-2xl), white 90% background
  - Large circular play button (120px), soft teal fill
  - Waveform visualization below controls (animated bars in teal)
  - Progress bar with rounded ends, timestamp indicators
  - Secondary actions (replay, download) as icon buttons
- Routine Sections: White cards (70% opacity) with icons, generous p-12 padding
- Hydration/Nutrition: Side-by-side cards with large icons (water drop, grain)
- Strategy: Highlighted card with soft lavender background, checkmark list

### Dashboard
- Welcome header: Large greeting with athlete name, text-4xl over gradient
- Quick Action CTA: Prominent "Begin Pre-Match Routine" card with soft teal gradient
- Recent Routines: 2-column grid, white cards with shadows, date/opponent/preview
- Each card: Hover lift (translate-y-1), shadow transition

### Knowledge Base
- 3-column grid on desktop, cards with gradient overlay on background images
- Card structure: Icon top, title, description, "Read Article" link in teal
- Article reading: Single column max-w-prose, soft cream background gradient

### Icons
**Library**: Heroicons (outline primary, solid for active states)
- Breathing: Wind, Strategy: Clipboard-list, Nutrition: Beaker, Meditation: Sparkles, Focus: Eye

## Images
**Hero Images**:
- Routine Output: Abstract calm imagery (zen garden, misty mountains, calm water)—full width, subtle overlay gradient
- Dashboard: Optional soft background (athlete in meditation pose, sunrise, peaceful stadium)—blurred, low opacity

**Article Cards**: Header images showing meditation, breathing exercises, calm athletic preparation—with gradient overlays matching color palette

**Empty States**: Motivational imagery (starting blocks with sunrise, peaceful locker room)—always with text overlay on blurred backgrounds

## Animations
- Page transitions: Gentle fade (400ms ease-in-out)
- Audio player: Subtle pulse on play button, waveform bars animate gently
- Form steps: Slide-fade transitions (350ms)
- Card hovers: Smooth lift (200ms ease-out)
- No autoplay, no aggressive micro-interactions

## Page-Specific Layouts

### Home/Dashboard
- Full-width gradient background
- Centered welcome (text-5xl, py-20)
- Primary CTA card (elevated, glowing teal shadow)
- Recent routines grid below (py-16 top margin)

### Match-Day Form
- Step indicator with soft teal progress
- Each section in white card (backdrop-blur), centered max-w-3xl
- Strategy template: 5 textareas with numbered labels, helper text in gray
- Current state: Mood chips in pill layout, energy slider full-width
- Generate CTA: Bottom-fixed with gradient background blur

### Routine Output
- Hero section: 60vh minimum, mantra centered with ample padding
- Audio card: Elevated center focus, white background with shadow-2xl
- Sections stacked: py-20 between each, icons left-aligned in cards
- Hydration/Nutrition: grid-cols-2 gap-8, visual icons prominent
- Footer actions: Soft buttons in row, "Return Home" primary

### Knowledge Articles
- Grid with gradient card backgrounds
- Article page: Cream gradient background, centered prose, comfortable line-height
- Back navigation with breadcrumb in warm gray

## Visual Treatment
- All gradients: Subtle, multi-stop (3-4 colors), diagonal direction
- Shadows: Soft and diffused (shadow-lg with teal/purple tint)
- Borders: Minimal use, prefer backdrop-blur cards
- Focus states: Soft teal ring (ring-2 ring-teal-400/50)
- Button backgrounds on images: Always backdrop-blur-md with white 20% background