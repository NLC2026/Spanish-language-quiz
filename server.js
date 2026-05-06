'use strict';

// node:sqlite is built into Node.js 22+ — no npm install required
const { DatabaseSync } = require('node:sqlite');
const express          = require('express');
const path             = require('path');

const PORT    = 3000;
const DB_PATH = path.join(__dirname, 'quiz.db');

// ── Database setup (auto-creates file + tables on first run) ─────────────────
const db = new DatabaseSync(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS quiz_summaries (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    name         TEXT    NOT NULL,
    language     TEXT    NOT NULL,
    score        INTEGER NOT NULL,
    total        INTEGER NOT NULL,
    completed_at TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS question_answers (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    language    TEXT    NOT NULL,
    phrase      TEXT    NOT NULL,
    selected    TEXT    NOT NULL,
    correct     TEXT    NOT NULL,
    is_correct  INTEGER NOT NULL,
    answered_at TEXT    NOT NULL DEFAULT (datetime('now'))
  );
`);

console.log(`✔  Database ready at ${DB_PATH}`);

// ── Prepared statements ───────────────────────────────────────────────────────
const insertAnswer = db.prepare(
  'INSERT INTO question_answers (name, language, phrase, selected, correct, is_correct) VALUES (?, ?, ?, ?, ?, ?)'
);

const insertSummary = db.prepare(
  'INSERT INTO quiz_summaries (name, language, score, total) VALUES (?, ?, ?, ?)'
);

const selectSummaries = db.prepare(
  'SELECT id, language, score, total, completed_at FROM quiz_summaries WHERE LOWER(name) = LOWER(?) ORDER BY completed_at DESC'
);

const selectAnswers = db.prepare(
  'SELECT id, language, phrase, selected, correct, is_correct, answered_at FROM question_answers WHERE LOWER(name) = LOWER(?) ORDER BY answered_at DESC'
);

// ── Express app ───────────────────────────────────────────────────────────────
const app = express();
app.use(express.json());
app.use(express.static(__dirname));   // serves index.html, history.html, quiz.js, styles.css …

// POST /api/answer — log one individual question answer
app.post('/api/answer', (req, res) => {
  const { name, language, phrase, selected, correct, is_correct } = req.body;
  if (!name || !language || !phrase || selected == null || correct == null) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  try {
    const info = insertAnswer.run(
      name.trim(), language, phrase, selected, correct, is_correct ? 1 : 0
    );
    res.json({ id: Number(info.lastInsertRowid) });
  } catch (err) {
    console.error('DB error (answer):', err.message);
    res.status(500).json({ error: 'DB error' });
  }
});

// POST /api/quiz-complete — log a finished quiz summary
app.post('/api/quiz-complete', (req, res) => {
  const { name, language, score, total } = req.body;
  if (!name || !language || score == null || total == null) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  try {
    const info = insertSummary.run(name.trim(), language, score, total);
    res.json({ id: Number(info.lastInsertRowid) });
  } catch (err) {
    console.error('DB error (summary):', err.message);
    res.status(500).json({ error: 'DB error' });
  }
});

// GET /api/history?name=Sandra — full history for one player
app.get('/api/history', (req, res) => {
  const name = (req.query.name || '').trim();
  if (!name) return res.status(400).json({ error: 'name param is required' });
  try {
    const summaries = selectSummaries.all(name);
    const answers   = selectAnswers.all(name);
    res.json({ name, summaries, answers });
  } catch (err) {
    console.error('DB error (history):', err.message);
    res.status(500).json({ error: 'DB error' });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌊  Language Quiz server running`);
  console.log(`   Quiz      →  http://localhost:${PORT}/`);
  console.log(`   History   →  http://localhost:${PORT}/history.html`);
  console.log(`   DB file   →  ${DB_PATH}`);
  console.log(`\nPress Ctrl+C to stop.\n`);
});
