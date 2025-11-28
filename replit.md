# FocusMode - AI Pre-Match Routine Coach

## Overview

FocusMode is a web application that generates personalized 10-minute pre-match mental preparation routines for athletes. The system collects athlete profiles (name, physical stats, gender, level of play, sport details, mental tendencies, and habits) and match-day inputs (opponent information, strategy, mood, energy levels) to create AI-powered guided routines. 

Each routine includes:
1. **Breathing Routine** - Slow, steady breathing cues with timing guidance
2. **Visualization Routine** - Mental imagery of match phases and execution
3. **Personalized Mantra** - 3-5 word athlete-specific affirmation
4. **Strategy Reminders** - Actionable bullet points
5. **Hydration & Energy Cue** - Evidence-based recommendations (ACSM/IOC/ISSN formulas)
6. **Motivational Closing** - Calm, grounded closing statement

Additionally, a separate 10-minute guided meditation script (~1000-1200 words) is generated and converted to audio using OpenAI TTS.

The application features a marketing landing page for unauthenticated users, email/password authentication, and fully personalized experiences that address athletes by name throughout the interface.

The application follows Apple HIG-inspired design principles with a focus on calm, distraction-free interfaces that support mental clarity and pre-match focus.

## Recent Changes (November 28, 2025)

**Enhanced Routine Generation**:
- Added `gender` and `levelOfPlay` fields to athlete profiles for personalized hydration/carb calculations
- Implemented evidence-based physiological calculations (ACSM, IOC, ISSN-backed formulas):
  - Daily hydration baseline based on gender and weight
  - Pre-match hydration (2-4 hours and 30-60 minutes before)
  - Carbohydrate targets based on match duration and level of play
- New GPT-4o prompt following elite sports psychology methodology
- Routine now structured as 6 sections plus separate 10-minute meditation script
- Audio is generated from the meditation script (not the summary routine)
- Added `meditationScript` column to routines table

**Updated Onboarding**:
- Bio Info step now collects gender
- Sport Profile step now collects level of play (Beginner/Intermediate/Advanced/Elite)

**Routine Output Page Improvements**:
- Updated section parsing for new routine format
- Added toggle to view full meditation script text
- Personalized Mantra displayed as highlighted card
- Audio player labeled as "10-Minute Guided Meditation"

## Previous Changes (November 25, 2025)

**Personalization Features**:
- Added `name` field to athlete profiles (stored in database)
- Enhanced onboarding to 5-step process with name as first step
- Personalized dashboard shows user's actual name and avatar with initials

**Landing Page & Authentication**:
- Created marketing landing page at "/" with hero section, features, how-it-works, and CTAs
- Moved login/signup to "/auth" route

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, bundled using Vite

**Routing**: Wouter (lightweight client-side routing)

**State Management**: 
- TanStack Query (React Query) for server state management
- React Hook Form with Zod validation for form state
- Local component state with React hooks

**UI Component System**:
- Shadcn/ui component library (Radix UI primitives with custom styling)
- Tailwind CSS for styling with custom design tokens
- Component aliases configured via TypeScript path mapping (@/components, @/lib, @/hooks)

**Design System**:
- Typography: Inter (body/forms) and Poppins (headers/display) from Google Fonts
- Color system: HSL-based theme with CSS custom properties for light/dark mode support
- Spacing: Tailwind utility-first with standardized spacing scale (4, 6, 8, 12, 16, 20)
- Component patterns: Cards, forms with multi-step progress, mood chips, audio player, navigation sidebar

**Key Pages**:
- Landing: Marketing page with hero, features, how-it-works sections (unauthenticated users)
- Auth (/auth): Email/password login and signup
- Home: Personalized dashboard with user's name, avatar initials, and their routines (empty state if none)
- AthleteSetup: 5-step onboarding form (name, bio, sport profile, habits, mental state)
- MatchInput: Match-day check-in with opponent/strategy template input
- RoutineOutput: Immersive routine display with audio playback
- History: Past routine archive
- Knowledge: Educational article library
- Profile: Athlete profile view/edit (fetches real data from API)

### Backend Architecture

**Runtime**: Node.js with Express

**API Pattern**: RESTful JSON API with the following endpoints:
- GET /api/auth/user - Get authenticated user information
- GET /api/athlete-profile - Get athlete profile for logged-in user
- POST /api/athlete-profile - Create athlete profile for logged-in user
- PATCH /api/athlete-profile/:id - Update athlete profile (verifies ownership)
- GET /api/routines - Get all routines for logged-in user (filtered by user's athlete profile)
- GET /api/routines/:id - Get specific routine (verifies ownership)
- POST /api/routines/generate - Generate new routine for logged-in user (verifies ownership)

**Development vs Production**:
- Development: Vite dev server with HMR, middleware mode
- Production: Static file serving from dist/public

**Build System**:
- Client: Vite bundles React app to dist/public
- Server: esbuild bundles Express server to dist/index.js
- TypeScript compilation with strict mode enabled

### Data Storage

**Database**: PostgreSQL (via Neon serverless with WebSocket connections)

**ORM**: Drizzle ORM with schema-first approach

**Schema Design**:
- `users`: Stores email and hashed password for authentication
- `athlete_profiles`: Stores athlete name, bio (height, weight, age, gender), sport details (sport, position, levelOfPlay), preferredMatchTime, hydrationHabits, dietType, mentalTendencies, performsBestWhen (one per user, linked via userId)
- `routines`: Stores generated routines with match details, strategy template (JSONB), mood/energy data, routine text, meditation script, and audio URL (linked to athlete_profiles)

**Data Filtering**:
- All API endpoints enforce user-specific filtering
- Routines are only visible to the athlete profile owner
- Profile updates verify ownership before allowing changes

**Migrations**: Drizzle Kit manages schema migrations in /migrations directory

### External Dependencies

**AI Services**:
- OpenAI GPT-4 API: Generates personalized routine text based on athlete profile and match-day inputs
- API key configuration: OPENAI_API_KEY or AI_INTEGRATIONS_OPENAI_API_KEY environment variable

**Text-to-Speech**:
- OpenAI TTS API (tts-1 model with "nova" voice)
- High-quality, natural-sounding voice synthesis ideal for meditation/coaching
- Speed set to 0.9x for calm, relaxed delivery
- Audio files stored in public/audio directory and served statically

**Database**:
- Neon Serverless PostgreSQL: Managed PostgreSQL with connection pooling
- WebSocket-based connection (ws library required)
- DATABASE_URL environment variable required

**Form Validation**:
- Zod: Runtime schema validation
- React Hook Form resolvers integrate Zod with form state

**UI Component Libraries**:
- Radix UI: Accessible component primitives (dialogs, dropdowns, sliders, etc.)
- Embla Carousel: Touch-friendly carousel component
- cmdk: Command palette component
- Lucide React: Icon library

**Utility Libraries**:
- clsx + tailwind-merge: Conditional className composition
- class-variance-authority: Component variant management
- date-fns: Date manipulation and formatting
- nanoid: Unique ID generation

**Development Tools**:
- Replit-specific plugins: Cartographer, dev banner, runtime error modal
- TypeScript for type safety across client, server, and shared code
- PostCSS with Tailwind and Autoprefixer for CSS processing