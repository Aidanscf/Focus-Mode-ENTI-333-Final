# FocusMode - AI Pre-Match Routine Coach

FocusMode is an AI-powered web application that generates personalized 10-minute pre-match mental preparation routines for athletes. The system helps athletes achieve optimal mental states before competition through scientifically-backed sports psychology techniques.

## Features

### Athlete Profile Setup
- Comprehensive 5-step onboarding collecting:
  - Personal information (name, height, weight, age, gender)
  - Sport details (sport type, position, level of play)
  - Preferences (match time, hydration habits, diet type)
  - Mental tendencies and optimal performance conditions

### Match-Day Check-In
- Pre-match input form capturing:
  - Opponent information
  - 5-field strategy template (What to do, What not to do, If-then plans, Key moments, Success cues)
  - Current mood and energy levels (1-10 scale)

### AI-Powered Routine Generation
Each routine includes 6 structured sections:
1. **Breathing Routine** - Slow, steady breathing cues with timing guidance
2. **Visualization Routine** - Mental imagery of match phases and execution
3. **Personalized Mantra** - 3-5 word athlete-specific affirmation
4. **Strategy Reminders** - Actionable bullet points from your game plan
5. **Hydration & Energy Cue** - Evidence-based recommendations using ACSM/IOC/ISSN formulas
6. **Motivational Closing** - Calm, grounded closing statement

### 10-Minute Guided Meditation
- Separate meditation script (~1000-1200 words) generated for each routine
- Converted to audio using OpenAI TTS (with gTTS fallback)
- Audio player with progress tracking and seeking capability

### Knowledge Base
6 evidence-based sports psychology articles:
- Visualization and Imagery
- Breathing and Relaxation Exercises
- Cue Words and Pre-Performance Self-Talk
- Pre-Match Routines and Rituals
- Mental Rehearsal and Focus Scripts
- Short-Term Priming Techniques

### Additional Features
- Marketing landing page for new users
- Email/password authentication
- Routine history archive
- Personalized dashboard with user's name and avatar
- Apple HIG-inspired design with calming lavender/teal/purple palette

## Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for bundling and development
- **Tailwind CSS** with custom design tokens
- **Shadcn/ui** component library (Radix UI primitives)
- **Wouter** for client-side routing
- **TanStack Query** for server state management
- **React Hook Form** with Zod validation

### Backend
- **Node.js** with Express
- **Drizzle ORM** for database operations
- **PostgreSQL** (Neon serverless) for data persistence
- RESTful JSON API architecture

### AI & Audio
- **OpenAI GPT-4o** for routine generation
- **OpenAI TTS** (tts-1 model, "nova" voice) for meditation audio
- **gTTS** (Google Text-to-Speech) as fallback

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database (Required)
DATABASE_URL=postgresql://user:password@host:port/database

# OpenAI API (Required for routine generation)
OPENAI_API_KEY=sk-...
# OR use Replit's AI integration:
AI_INTEGRATIONS_OPENAI_API_KEY=sk-...

# Session (Required for authentication)
SESSION_SECRET=your-secure-session-secret
```

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database (or use Replit's built-in Neon database)
- OpenAI API key

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up environment variables (see above)

3. Push database schema:
```bash
npm run db:push
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   └── ui/         # Shadcn/ui components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and query client
│   │   └── pages/          # Page components
│   │       ├── Landing.tsx      # Marketing landing page
│   │       ├── Auth.tsx         # Login/signup page
│   │       ├── Home.tsx         # Dashboard
│   │       ├── AthleteSetup.tsx # Onboarding flow
│   │       ├── MatchInput.tsx   # Pre-match check-in
│   │       ├── RoutineOutput.tsx # Routine display + audio
│   │       ├── History.tsx      # Past routines
│   │       ├── Knowledge.tsx    # Article library
│   │       ├── Article.tsx      # Article detail
│   │       └── Profile.tsx      # User profile
│   └── index.html
├── server/                 # Backend Express application
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API endpoints
│   ├── storage.ts          # Database operations interface
│   ├── auth.ts             # Authentication logic
│   ├── openai.ts           # OpenAI integration
│   └── vite.ts             # Vite dev server setup
├── shared/                 # Shared code between client/server
│   └── schema.ts           # Drizzle schema + Zod types
├── migrations/             # Database migrations
└── public/
    └── audio/              # Generated meditation audio files
```

## API Endpoints

### Authentication
- `GET /api/auth/user` - Get current authenticated user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/register` - Create new account
- `POST /api/auth/logout` - Logout current session

### Athlete Profiles
- `GET /api/athlete-profile` - Get profile for logged-in user
- `POST /api/athlete-profile` - Create athlete profile
- `PATCH /api/athlete-profile/:id` - Update athlete profile

### Routines
- `GET /api/routines` - Get all routines for logged-in user
- `GET /api/routines/:id` - Get specific routine
- `POST /api/routines/generate` - Generate new AI routine

## Database Schema

### Users
Stores authentication credentials (email, hashed password).

### Athlete Profiles
- Personal info: name, height, weight, age, gender
- Sport details: sport, position, level of play
- Preferences: preferred match time, hydration habits, diet type
- Mental profile: mental tendencies, performs best when

### Routines
- Match context: opponent info, strategy template (JSONB)
- State data: mood level, energy level
- Generated content: routine text, meditation script
- Audio: URL to generated audio file

## Hydration & Nutrition Calculations

FocusMode uses evidence-based formulas for personalized recommendations:

- **Daily hydration baseline**: Gender and weight-based (ACSM guidelines)
- **Pre-match hydration**: 2-4 hours before and 30-60 minutes before
- **Carbohydrate targets**: Based on match duration and competition level (IOC/ISSN)

## Design Philosophy

FocusMode follows Apple Human Interface Guidelines principles:
- Clean, minimalistic interfaces
- Generous spacing and gentle shadows
- Smooth gradients and rounded elements
- Calming color palette optimized for pre-competition mental state
- Distraction-free experience supporting focus and clarity

## License

This project is proprietary software developed for athlete mental preparation.

---

Built with focus and calm in mind.
