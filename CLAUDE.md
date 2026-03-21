# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive consumer psychology quiz app built for a research/educational context. It demonstrates the "pet exposure effect" from academic research (Jia et al., 2022, *Journal of Marketing*): exposure to dogs activates a **promotion-focused** mindset (risk-seeking, gain-oriented), while exposure to cats activates a **prevention-focused** mindset (risk-averse, loss-avoiding).

The app covertly exposes users to either a dog or cat via an animated interaction sequence, then presents 5 consumer decision scenarios, and finally reveals how the pet exposure may have influenced their choices.

## Commands

All development commands are run from `quiz-app/`:

```bash
cd quiz-app
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build → dist/
npm run preview   # Preview production build
npm run lint      # ESLint
```

## Architecture

### User Flow (page route order)

```
/ (WelcomePage) → /door (DoorPage) → /pet (PetInteractionPage) → /quiz (QuizPage) → /result (ResultPage)
```

1. **WelcomePage** — Entry point; calls `reset()` on start.
2. **DoorPage** — Randomly assigns `petType` ('dog' | 'cat') and navigates to `/pet` after door animation.
3. **PetInteractionPage** — 4-step interaction (gallery select → touch → play/feed → YouTube video). Embeds a YouTube video as the final priming stimulus before the quiz.
4. **QuizPage** — 5 questions from `src/data/questions.js`; each answer is 'A' (promotion) or 'B' (prevention), stored in `answers[]`.
5. **ResultPage** — Scores answers (≥3 A's = 'promotion', else 'prevention'), reveals result and the hidden pet priming mechanism.

### State Management

All quiz state lives in `QuizContext` (`src/context/QuizContext.jsx`), consumed via `useQuiz()` hook:
- `petType`: 'dog' | 'cat' — set randomly on DoorPage
- `selectedPetIndex`: which pet image the user chose in the gallery
- `answers`: array of 'A'/'B' strings
- `getResult()`: derives 'promotion' | 'prevention' from answers

### Data Files

- `src/data/questions.js` — 5 scenario questions with optionA (promotion) and optionB (prevention)
- `src/data/results.js` — Result type definitions (`results`) and the post-quiz reveal text (`reveal`) including academic citation

### Design System

Custom Tailwind colors defined in `tailwind.config.js`:
- `cream` (#FFF8F0), `milk` (#D4A574), `blush` (#F5C6C6), `warmBrown` (#8B6F47), `softPink` (#FAEAE0)
- Font: Noto Sans TC (supports Traditional Chinese)

### Key Dependencies

- **framer-motion** — Page transitions (`AnimatePresence`) and component animations throughout
- **react-router-dom v7** — Client-side routing
- **html2canvas** — Used in `ShareButtons` to capture the result card as an image for sharing
- **tailwindcss v3** — Utility-first styling

### Reference Material

`reference/paper-summary.md` contains a detailed summary of the Jia et al. (2022) paper that this app is based on. Consult it when modifying question content, result descriptions, or the reveal section to ensure scientific accuracy.
