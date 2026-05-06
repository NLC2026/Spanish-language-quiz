'use strict';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const NAME_KEY  = 'quizPlayerName';
const LANG_LABEL = { es: '🇪🇸 Spanish', fr: '🇫🇷 French' };

function getName()      { return (localStorage.getItem(NAME_KEY) || '').trim(); }
function saveName(name) { localStorage.setItem(NAME_KEY, name.trim()); }

function formatDate(isoStr) {
  // SQLite stores UTC without 'Z'; append it so JS parses correctly
  const d = new Date(isoStr.endsWith('Z') ? isoStr : isoStr + 'Z');
  return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

// ─── Render summaries ─────────────────────────────────────────────────────────

function renderSummaries(rows) {
  const tbody   = document.getElementById('summaries-body');
  const noData  = document.getElementById('no-summaries');
  const wrap    = document.getElementById('summaries-wrap');
  tbody.innerHTML = '';

  if (rows.length === 0) {
    noData.classList.remove('hidden');
    wrap.classList.add('hidden');
    return;
  }
  noData.classList.add('hidden');
  wrap.classList.remove('hidden');

  rows.forEach(row => {
    const pct = Math.round((row.score / row.total) * 100);
    const pctClass = pct >= 80 ? 'pct--high' : pct >= 60 ? 'pct--mid' : 'pct--low';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="date-cell">${formatDate(row.completed_at)}</td>
      <td>${LANG_LABEL[row.language] || row.language}</td>
      <td><strong>${row.score}</strong> / ${row.total}</td>
      <td class="pct-cell ${pctClass}">${pct}%</td>
    `;
    tbody.appendChild(tr);
  });
}

// ─── Render answers ───────────────────────────────────────────────────────────

function renderAnswers(rows) {
  const tbody  = document.getElementById('answers-body');
  const noData = document.getElementById('no-answers');
  const wrap   = document.getElementById('answers-wrap');
  tbody.innerHTML = '';

  if (rows.length === 0) {
    noData.classList.remove('hidden');
    wrap.classList.add('hidden');
    return;
  }
  noData.classList.add('hidden');
  wrap.classList.remove('hidden');

  rows.forEach(row => {
    const ok = row.is_correct === 1;
    const tr = document.createElement('tr');
    tr.className = ok ? 'row-correct' : 'row-wrong';
    tr.innerHTML = `
      <td class="phrase-cell">${row.phrase}</td>
      <td class="${ok ? '' : 'answer-wrong'}">${row.selected}</td>
      <td>${row.correct}</td>
      <td class="result-icon">${ok ? '✓' : '✗'}</td>
      <td class="date-cell">${formatDate(row.answered_at)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ─── Fetch + render ───────────────────────────────────────────────────────────

async function loadHistory(name) {
  const errEl   = document.getElementById('history-error');
  const content = document.getElementById('history-content');

  errEl.classList.add('hidden');

  try {
    const res = await fetch(`/api/history?name=${encodeURIComponent(name)}`);
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    const data = await res.json();

    renderSummaries(data.summaries);
    renderAnswers(data.answers);
    content.classList.remove('hidden');
  } catch (err) {
    content.classList.add('hidden');
    errEl.textContent = '⚠️ Could not load history. Make sure the server is running (npm start).';
    errEl.classList.remove('hidden');
  }
}

// ─── Init ─────────────────────────────────────────────────────────────────────

(function init() {
  const input   = document.getElementById('history-name');
  const loadBtn = document.getElementById('load-btn');

  // Pre-fill name from localStorage
  input.value = getName();

  function onLoad() {
    const name = input.value.trim();
    if (!name) return;
    saveName(name);
    loadHistory(name);
  }

  loadBtn.addEventListener('click', onLoad);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') onLoad(); });

  // Auto-load if name is already stored
  if (input.value) onLoad();
})();
