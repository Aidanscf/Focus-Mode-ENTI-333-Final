# FocusMode - AI Pre-Match Routine Coach

## Overview

FocusMode is a web application that generates personalized 10-minute pre-match mental preparation routines for athletes. The system collects athlete profiles (physical stats, sport details, mental tendencies, and habits) and match-day inputs (opponent information, strategy, mood, energy levels) to create AI-powered guided routines. Each routine includes breathing exercises, visualization techniques, personalized mantras, tactical reminders, and hydration/nutrition suggestions delivered through both text and text-to-speech audio.

The application follows Apple HIG-inspired design principles with a focus on calm, distraction-free interfaces that support mental clarity and pre-match focus.

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
- Home: Dashboard overview
- AthleteSetup: Multi-step form (bio, sport profile, habits, mental state)
- MatchInput: Match-day check-in with opponent/strategy template input
- RoutineOutput: Immersive routine display with audio playback
- History: Past routine archive
- Knowledge: Educational article library
- Profile: Athlete profile view/edit

### Backend Architecture

**Runtime**: Node.js with Express

**API Pattern**: RESTful JSON API with the following endpoints:
- GET/POST /api/athlete-profile - Athlete profile CRUD
- POST /api/routines - Create new routine
- GET /api/routines/:id - Retrieve specific routine

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
- `athlete_profiles`: Stores athlete bio, sport details, habits, mental tendencies (one per user in MVP)
- `routines`: Stores generated routines with match details, strategy template (JSONB), mood/energy data, routine text, and audio URL

**Migrations**: Drizzle Kit manages schema migrations in /migrations directory

### External Dependencies

**AI Services**:
- OpenAI GPT-4 API: Generates personalized routine text based on athlete profile and match-day inputs
- API key configuration: OPENAI_API_KEY or AI_INTEGRATIONS_OPENAI_API_KEY environment variable

**Text-to-Speech**:
- gTTS (Google Text-to-Speech) Python library
- Executed via Node.js child_process to convert routine text to MP3 audio
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