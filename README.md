# 🏖️ Language Travel Quiz

A browser-based language quiz to practise essential travel phrases before your Mediterranean vacation. Pick the correct English translation for Spanish or French phrases — with a SQLite backend that remembers your progress across visits.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Start the server
npm start
```

Then open your browser:

| Page | URL |
|---|---|
| Quiz | http://localhost:3000/ |
| My History | http://localhost:3000/history.html |

The database file (`quiz.db`) is created automatically the first time the server runs — no setup needed.

---

## 🌍 Languages Supported

| Language | Phrases | Theme |
|----------|---------|-------|
| 🇪🇸 Spanish | 20 travel phrases | Ocean blue / turquoise |
| 🇫🇷 French  | 20 travel phrases | French navy / cornflower blue |

---

## ✨ Features

- **Name persistence** — type your name once; it's saved in the browser so you never have to retype it
- **20 travel phrases per language** — greetings, directions, dining, accommodation, and more
- **Multiple choice** — 4 options per question, shuffled every time
- **Randomised question order** on every visit
- **Instant feedback** — green for correct, red for wrong with the right answer shown
- **Live progress bar** + score tracker throughout the quiz
- **5-tier results screen** with a personalised message
- **Language switcher** — toggle Spanish ↔ French; the entire colour theme changes
- **Language badge** during the quiz so you always know which language you're practising
- **SQLite backend** — every answer and quiz summary is saved as you play
- **My History page** — see all your past attempts and every individual question you've answered, colour-coded green/red
- **Offline-friendly** — if the server is unreachable the quiz keeps working; a small toast tells you answers couldn't be saved
- **Mediterranean beach aesthetic** with animated wave background

---

## 📁 File Structure

```
spanish-quiz/
├── server.js       # Express + better-sqlite3 backend (API + static file serving)
├── package.json    # Node dependencies
├── quiz.db         # SQLite database (auto-created, git-ignored)
│
├── index.html      # Quiz page (start / quiz / results screens)
├── quiz.js         # Quiz logic, language switching, API calls
│
├── history.html    # History page
├── history.js      # Fetches and renders quiz history
│
├── styles.css      # Shared Mediterranean theme (quiz + history)
│
├── .gitignore      # Excludes node_modules/ and *.db
└── README.md
```

---

## 🗄️ Database

The SQLite database lives at `quiz.db` in the project folder. You can inspect it with the `sqlite3` command-line tool:

```bash
sqlite3 quiz.db

# Show all tables
.tables

# See every answer Sandra has logged
SELECT * FROM question_answers WHERE name = 'Sandra';

# See all quiz summaries, newest first
SELECT * FROM quiz_summaries ORDER BY completed_at DESC;

# Exit
.quit
```

**Tables:**

| Table | What it stores |
|---|---|
| `question_answers` | Every individual question answered — name, language, phrase, selected answer, correct answer, right/wrong flag, timestamp |
| `quiz_summaries` | One row per completed quiz — name, language, score, total questions, timestamp |

---

## 🗺️ Phrase Categories

- **Greetings** — Bonjour / Buenos días, Bonne nuit / Buenas noches
- **Politeness** — Merci / Gracias, De rien / De nada, Excusez-moi / Disculpe
- **Directions** — Finding the beach, hotel, bathroom, and currency exchange
- **Dining** — Ordering a table, asking for the bill, making a reservation
- **Practical** — Getting a taxi, finding a room, asking for help, saying you're lost

---

## 🛠️ Built With

- **Node.js + Express** — lightweight static file server + REST API
- **better-sqlite3** — fast, synchronous SQLite driver
- **HTML5 / CSS3 / Vanilla JavaScript** — no frameworks, no build tools

---

*Built as a travel prep tool for a Mediterranean beach vacation. ¡Buen viaje! Bon voyage!* 🌊
