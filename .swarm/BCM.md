# BCM Manifest — GlobaLingo
> Generated during `/swarm` Phase 4 | MA-001 authored

## 🎯 Hard Constraints (Non-Negotiable)

### 1. The Daily Snack [GOAL-ID: DAILY_LOOP]
- [ ] App must start with a "Country/Language Selection" screen.
- [ ] Daily Word Card must display: Word, IPA (Pronunciation), Definition, and Country of Origin.

### 2. The Voice Coach [GOAL-ID: ECHO_CHECK]
- [ ] "Play" button triggers text-to-speech for the target word.
- [ ] "Speak" button activates microphone and transcribes input.
- [ ] Confidence score (0-100%) must be calculated and displayed via a radial or linear gauge.
- [ ] Pass threshold: 70% (user can proceed).

### 3. The Calligraphy Studio [GOAL-ID: TRACE_MASTER]
- [ ] Canvas element that allows freehand drawing.
- [ ] "Ghost" character overlay for the user to trace.
- [ ] "Clear" and "Verify" buttons.
- [ ] Simple validation: At least 50% of the ghost pixels must be covered.

### 4. The Memory Match [GOAL-ID: RECALL_GAME]
- [ ] Mini-game where user must select the correct definition from 3 options.

### 5. Aesthetics & UX [GOAL-ID: PREMIUM_DESIGN]
- [ ] Dark Mode (Deep Forest Green base).
- [ ] Glassmorphic cards.
- [ ] Responsive design (mobile first).
- [ ] Professional README.md with setup instructions.

## 🚀 Deployment Checklist
- [ ] All Swarm files moved to `.swarm/`.
- [ ] Professional README.md in root.
- [ ] Pushed to GitHub via `gh` CLI.
