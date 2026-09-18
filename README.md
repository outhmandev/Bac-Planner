# Bac-Planner (Blush Planner) 🌸🎓

> **Academic Command Center for the Moroccan 2nd Baccalaureate (Examen National BIOF) & German Ausbildung Roadmap**

Live Deployment: **[https://nounoudaba.ma/](https://nounoudaba.ma/)**

---

## 🌟 Overview

**Bac-Planner** is a modern personal command center tailored specifically for Moroccan high school seniors preparing for the **2nd Baccalaureate National Exam (الامتحان الوطني الموحد)** across **Sciences Expérimentales (PC/SVT)** and **Sciences Mathématiques**, while planning their pathway to a **Duale Ausbildung (Fachinformatiker für Anwendungsentwicklung)** in Germany.

Built with a soft-pink, ivory, and champagne aesthetic, smooth micro-interactions, responsive design, and per-user data isolation.

---

## 📚 Features

### 1. Moroccan 2nd Bac Curriculum (44 Chapters • 170+ Lessons)
Strictly aligned with the **Cadre de Référence (الإطار المرجعي)** of the Moroccan Ministry of National Education and **AlloSchool** BIOF standards:
- **Mathématiques (الرياضيات)** — Coefficient 7 (10 Chapters, 40 Lessons)
- **Physique-Chimie (الفيزياء والكيمياء)** — Coefficient 7 (14 Chapters, 44 Lessons)
- **Sciences de la Vie et de la Terre (SVT)** — Coefficient 5 (6 Chapters, 24 Lessons)
- **Philosophie (الفلسفة)** — Coefficient 2 (4 Modules, 8 Concepts, 24 Lessons)
- **English (اللغة الإنجليزية)** — Coefficient 2 (10 Units, 40 Lessons)

### 2. Cadre de Référence & Key Formulas Drawer
- 📐 **Official Formulas & Theorems**: Expandable per lesson.
- 💡 **Examiner Pitfall Advice**: Common traps based on ministerial marking schemes.
- 🔗 **Direct AlloSchool Links**: 1-click access to lesson summaries and practice exercises.

### 3. Past National Exams Archive (2020 - 2024)
- Official Moroccan National Exam papers (Session Normale & Session de Rattrapage).
- Exercise structure breakdowns (e.g., Complexes 3 pts, Spatiale 3 pts, Probabilités 3 pts, Analyse 11 pts).
- Direct links to AlloSchool PDF exam papers and official answer keys.
- Interactive self-scoring input (`/20`) and mastery tracker.

### 4. Interactive Bac Grade & Mention Simulator
Calculates the exact National Exam average using the official Moroccan coefficients:
$$\text{Moyenne du National} = \frac{\text{Math}\times 7 + \text{PC}\times 7 + \text{SVT}\times 5 + \text{Philo}\times 2 + \text{English}\times 2}{23}$$
- 🏆 **Mention Très Bien (Félicitations du Jury)** ($\ge 18.00$)
- 🌟 **Mention Très Bien** ($\ge 16.00$)
- ⭐ **Mention Bien** ($\ge 14.00$)
- ✨ **Mention Assez Bien** ($\ge 12.00$)
- 👍 **Passable** ($\ge 10.00$)
- ⚠️ **Session de Rattrapage** ($< 10.00$)

### 5. CEFR German Hub (A1 • A2 • B1 • B2)
- 80 high-yield vocabulary cards aligned with Goethe-Institut & telc standards.
- **Native Audio Pronunciation**: Built-in Speech Synthesis (`lang = 'de-DE'`).
- **Interactive Flashcards**: Spaced repetition ratings (Again, Hard, Good, Easy) with flip animations.
- **Ausbildung Roadmap**: German apprenticeship milestones and application tracker.

### 6. Productivity & Student Life
- **Today Dashboard**: Quick stats, priority matrix (P1-P4), Pomodoro focus timer.
- **Habit Tracker**: Daily streaks and routine routines.
- **Calendar & Timeline**: Integrated exam countdown and continuous assessments (Devoirs Surveillés).
- **Isolated Multi-User Auth**: Secure client-side registration, login, and isolated storage sandboxes.

---

## 🛠️ Tech Stack

- **Framework**: React 19, TypeScript
- **Bundler**: Vite 8
- **Styling**: Vanilla CSS with modern tokens, glassmorphism, and responsive layouts
- **Icons**: Lucide React
- **Audio & FX**: Web Speech API, Canvas Confetti

---

## 🚀 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/outhmandev/Bac-Planner.git
cd Bac-Planner

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 🚢 Deployment to cPanel

To deploy to your live cPanel host:

```bash
# Set your cPanel token or create scripts/cpanel.config.json
# (see scripts/cpanel.config.example.json)

npm run deploy
```

---

## 📄 License

MIT © [outhmandev](https://github.com/outhmandev)
