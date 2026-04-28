# Business Plan — GlobaLingo
> Generated during `/swarm` Phase 2 | PA-001 authored | PR-001 Polishing

---

## 🏷️ App Name & Tagline
**Name**: GlobaLingo  
**Tagline**: Master one word, every day, from every corner of the world.

---

## 🎨 Visual Identity (Conceptual)
> Note: Image generation offline. Design system defined below.

- **Theme**: "Nomadic Minimalist".
- **Color Palette**: 
    - Primary: `#1B4332` (Deep Forest Green) - Grounding and academic.
    - Secondary: `#FF9F1C` (Sunrise Orange) - Energy and call-to-action.
    - Neutral: `#F8F9FA` (Soft Cream) - Readability and comfort.
- **Typography**: 
    - Headings: *Outfit* (Geometric, friendly).
    - Body: *Inter* (Clean, professional).
    - Script: Dynamic font loading based on selected language (Noto Sans for multi-language support).

---

## 👤 Target Audience
| Segment | Profile | Pain Point |
|---|---|---|
| **The Casual Globetrotter** | Travelers who want "just enough" to be polite. | Language apps feel like a part-time job; they just want a daily snack. |
| **The Script Curious** | Users fascinated by non-Latin alphabets (Arabic, Kanji, Cyrillic). | Hard to find apps that focus on the *art* of writing the characters. |
| **The Wordle Addict** | Fans of simple, daily, shareable challenges. | Current daily games are mostly English-only; no cultural depth. |

---

## 🔥 Pain Points
1. **Consistency Fatigue**: Duolingo's "Owl Pressure" makes users quit if they miss a day. GlobaLingo is a 60-second win.
2. **Abstract Learning**: Learning "The cat drinks milk" is boring. Learning "Komorebi" (Japanese for sunlight filtering through trees) is magical.
3. **Passive Retention**: Reading isn't enough. Speaking and drawing create muscle memory.

---

## ⚡ Key Features
| Priority | Feature | Description |
|---|---|---|
| 1 | **The Daily Word Card** | A random or selected-country word with definition, etymology, and beautiful script. |
| 2 | **Echo-Check (Voice)** | Real-time pronunciation validation using Web Speech API with a "Confidence Gauge". |
| 3 | **Stroke-Master (Canvas)** | A character-drawing mini-game with "Ghost Guides" to practice writing the script. |
| 4 | **Definition Duel** | A rapid-fire matching game to reinforce the word's meaning. |
| 5 | **The Atlas Streak** | A visual map showing countries "conquered" by learning their words. |

---

## 🏆 Competitor Analysis
| Competitor | Strength | GlobaLingo's Edge |
|---|---|---|
| **Duolingo** | Massive gamification. | We focus on *cultural depth* and *character drawing* in a shorter loop. |
| **Drops** | Visual vocabulary. | We add *active voice feedback* and *manual drawing*, not just swiping. |
| **Wordle** | High shareability. | We offer *utility* and *skill acquisition* beyond just a puzzle. |

---

## 💡 Unique Value Proposition (UVP)
> GlobaLingo is the only daily habit app that blends the logic of a language course with the manual art of calligraphy and the instant feedback of a voice coach.

---

## 💰 Monetization Strategy (Freemium)
- **Free Tier**: 1 daily word, basic voice feedback, drawing mini-game.
- **Lingo+ ($4.99/mo)**: 
    - "Flashback" (Review past words).
    - Unlimited practice sessions (not just once a day).
    - Audio download for offline listening.
    - Custom "Theme" unlocks (e.g., Cyberpunk, Parchment).

---

## 🏰 Moat
The combination of **character-tracing validation** (logic-heavy) and **voice confidence scoring** creates a high-friction barrier for simple clones. By building a "Culture Repository" rather than just a dictionary, we create emotional attachment to the content.

---

## 📊 Success Metrics
- **D1 Retention**: ≥ 45% (The goal is a daily habit).
- **Completion Rate**: ≥ 80% of users who open the app should finish the daily loop.
- **Share Rate**: ≥ 10% (Users sharing their "Conquered Map" or "Score Gauge").

---

## ✅ GOALS.md Seed
- [ ] User can select a specific country or "Random" for the daily word.
- [ ] Interactive "Daily Word" card with audio playback.
- [ ] Voice input implementation with confidence score (0-100%).
- [ ] Character-drawing canvas with stroke order logic (for non-Latin scripts).
- [ ] Definition matching mini-game.
- [ ] Streak and Map visualization.
