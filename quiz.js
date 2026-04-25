// ─── Question banks ───────────────────────────────────────────────────────────

const QUESTIONS = {
  es: [
    { phrase: "¿Dónde está la playa?",              correct: "Where is the beach?",              wrong: ["Where is the hotel?", "How far is the sea?", "Is there a pool nearby?"] },
    { phrase: "¿Cuánto cuesta?",                     correct: "How much does it cost?",            wrong: ["What time is it?", "Where can I pay?", "Do you have change?"] },
    { phrase: "La cuenta, por favor.",               correct: "The bill, please.",                 wrong: ["The menu, please.", "A table, please.", "The receipt, please."] },
    { phrase: "¿Habla inglés?",                      correct: "Do you speak English?",             wrong: ["Do you understand me?", "Can you translate?", "Is there a translator?"] },
    { phrase: "No entiendo.",                        correct: "I don't understand.",               wrong: ["I don't speak Spanish.", "I am lost.", "I can't hear you."] },
    { phrase: "¿Dónde está el baño?",               correct: "Where is the bathroom?",            wrong: ["Where is the exit?", "Where is the beach?", "Where is the restaurant?"] },
    { phrase: "¿Puede ayudarme?",                   correct: "Can you help me?",                  wrong: ["Can you repeat that?", "Can you call a taxi?", "Can you speak slower?"] },
    { phrase: "Buenos días.",                        correct: "Good morning.",                     wrong: ["Good night.", "Good afternoon.", "Have a good trip."] },
    { phrase: "Buenas noches.",                      correct: "Good night.",                       wrong: ["Good morning.", "See you tomorrow.", "Sleep well."] },
    { phrase: "Gracias.",                            correct: "Thank you.",                        wrong: ["Please.", "Sorry.", "Excuse me."] },
    { phrase: "De nada.",                            correct: "You're welcome.",                   wrong: ["No problem.", "That's alright.", "Don't mention it."] },
    { phrase: "Disculpe.",                           correct: "Excuse me.",                        wrong: ["I'm sorry.", "Pardon me.", "Thank you."] },
    { phrase: "¿Dónde está el hotel?",              correct: "Where is the hotel?",               wrong: ["Where is the airport?", "Where is the bus stop?", "Where is the market?"] },
    { phrase: "Quiero un taxi.",                     correct: "I want a taxi.",                    wrong: ["I want a bus.", "I need a map.", "I want to rent a car."] },
    { phrase: "¿Tiene una habitación disponible?",  correct: "Do you have a room available?",     wrong: ["How much is the room?", "Can I see the room?", "Is breakfast included?"] },
    { phrase: "Estoy perdido.",                      correct: "I am lost.",                        wrong: ["I am tired.", "I am hungry.", "I am looking for my hotel."] },
    { phrase: "¿Dónde puedo cambiar dinero?",       correct: "Where can I exchange money?",       wrong: ["Where is the bank?", "How much is the exchange rate?", "Can I pay by card?"] },
    { phrase: "Una mesa para dos, por favor.",      correct: "A table for two, please.",           wrong: ["A menu for two, please.", "Two coffees, please.", "A table outside, please."] },
    { phrase: "¿A qué hora abre?",                  correct: "What time does it open?",           wrong: ["What time does it close?", "Is it open today?", "When does the tour start?"] },
    { phrase: "Me gustaría reservar una mesa.",     correct: "I would like to reserve a table.",  wrong: ["I would like the menu.", "I would like to order.", "I would like to pay now."] },
  ],

  fr: [
    { phrase: "Où est la plage ?",                  correct: "Where is the beach?",               wrong: ["Where is the hotel?", "How far is the sea?", "Is there a pool nearby?"] },
    { phrase: "Combien ça coûte ?",                 correct: "How much does it cost?",             wrong: ["What time is it?", "Where can I pay?", "Do you have change?"] },
    { phrase: "L'addition, s'il vous plaît.",       correct: "The bill, please.",                  wrong: ["The menu, please.", "A table, please.", "The receipt, please."] },
    { phrase: "Parlez-vous anglais ?",              correct: "Do you speak English?",              wrong: ["Do you understand me?", "Can you translate?", "Is there a translator?"] },
    { phrase: "Je ne comprends pas.",               correct: "I don't understand.",                wrong: ["I don't speak French.", "I am lost.", "I can't hear you."] },
    { phrase: "Où sont les toilettes ?",            correct: "Where is the bathroom?",             wrong: ["Where is the exit?", "Where is the beach?", "Where is the restaurant?"] },
    { phrase: "Pouvez-vous m'aider ?",              correct: "Can you help me?",                   wrong: ["Can you repeat that?", "Can you call a taxi?", "Can you speak slower?"] },
    { phrase: "Bonjour.",                           correct: "Good morning / Hello.",              wrong: ["Good night.", "Good evening.", "Have a good trip."] },
    { phrase: "Bonne nuit.",                        correct: "Good night.",                        wrong: ["Good morning.", "See you tomorrow.", "Sleep well."] },
    { phrase: "Merci.",                             correct: "Thank you.",                         wrong: ["Please.", "Sorry.", "Excuse me."] },
    { phrase: "De rien.",                           correct: "You're welcome.",                    wrong: ["No problem.", "That's alright.", "Don't mention it."] },
    { phrase: "Excusez-moi.",                       correct: "Excuse me.",                         wrong: ["I'm sorry.", "Pardon me.", "Thank you."] },
    { phrase: "Où est l'hôtel ?",                   correct: "Where is the hotel?",                wrong: ["Where is the airport?", "Where is the bus stop?", "Where is the market?"] },
    { phrase: "Je voudrais un taxi.",               correct: "I would like a taxi.",               wrong: ["I would like a bus.", "I need a map.", "I would like to rent a car."] },
    { phrase: "Avez-vous une chambre disponible ?", correct: "Do you have a room available?",      wrong: ["How much is the room?", "Can I see the room?", "Is breakfast included?"] },
    { phrase: "Je suis perdu.",                     correct: "I am lost.",                         wrong: ["I am tired.", "I am hungry.", "I am looking for my hotel."] },
    { phrase: "Où puis-je changer de l'argent ?",  correct: "Where can I exchange money?",        wrong: ["Where is the bank?", "How much is the exchange rate?", "Can I pay by card?"] },
    { phrase: "Une table pour deux, s'il vous plaît.", correct: "A table for two, please.",        wrong: ["A menu for two, please.", "Two coffees, please.", "A table outside, please."] },
    { phrase: "À quelle heure ouvrez-vous ?",      correct: "What time do you open?",             wrong: ["What time do you close?", "Is it open today?", "When does the tour start?"] },
    { phrase: "Je voudrais réserver une table.",   correct: "I would like to reserve a table.",   wrong: ["I would like the menu.", "I would like to order.", "I would like to pay now."] },
  ],
};

// ─── Per-language copy ────────────────────────────────────────────────────────

const LANG_CONFIG = {
  es: {
    flag:       '🇪🇸',
    label:      'Spanish',
    heading:    '¡Hola, Viajero!',
    subtitle:   'Spanish Travel Phrase Quiz',
    intro:      'Practice 20 essential Spanish phrases for your Mediterranean vacation. Choose the correct English translation for each one.',
    emoji:      '🏖️',
    prompt:     'What does this Spanish phrase mean?',
    correct:    '✓ ¡Correcto!',
    results: {
      perfect:  { icon: '🏆', title: '¡Perfecto!',          msg: 'Flawless! You\'re ready to charm the whole Mediterranean coast.' },
      great:    { icon: '🌊', title: '¡Excelente!',          msg: 'Almost perfect — you\'ll have no trouble on your vacation!' },
      good:     { icon: '🏖️', title: '¡Muy bien!',           msg: 'Solid effort! A bit more practice and you\'ll be fluent on the beach.' },
      ok:       { icon: '🐚', title: 'Buen intento.',         msg: 'Not bad! Keep practising and those phrases will stick.' },
      retry:    { icon: '☀️', title: '¡Sigue intentando!',   msg: 'Every expert was once a beginner. Try again — you\'ve got this!' },
    },
  },
  fr: {
    flag:       '🇫🇷',
    label:      'French',
    heading:    'Bonjour, Voyageur !',
    subtitle:   'French Travel Phrase Quiz',
    intro:      'Practice 20 essential French phrases for your Mediterranean vacation. Choose the correct English translation for each one.',
    emoji:      '⚓',
    prompt:     'What does this French phrase mean?',
    correct:    '✓ Correct !',
    results: {
      perfect:  { icon: '🏆', title: 'Parfait !',            msg: 'Flawless! The whole Côte d\'Azur will be impressed.' },
      great:    { icon: '🌊', title: 'Excellent !',           msg: 'Almost perfect — you\'ll have no trouble on your vacation!' },
      good:     { icon: '🏖️', title: 'Très bien !',           msg: 'Solid effort! A little more practice and you\'ll feel right at home in France.' },
      ok:       { icon: '🐚', title: 'Pas mal.',              msg: 'Not bad! Keep practising and those phrases will stick.' },
      retry:    { icon: '☀️', title: 'Continuez d\'essayer !', msg: 'Every expert was once a beginner. Try again — vous pouvez le faire !' },
    },
  },
};

// ─── State ────────────────────────────────────────────────────────────────────

let currentLang      = 'es';
let shuffledQuestions = [];
let currentIndex     = 0;
let score            = 0;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }

// ─── Language switcher ────────────────────────────────────────────────────────

function setLanguage(lang) {
  currentLang = lang;
  const cfg = LANG_CONFIG[lang];

  // Body class drives CSS custom-property theme
  document.body.classList.remove('lang-es', 'lang-fr');
  document.body.classList.add(`lang-${lang}`);

  // Header
  document.getElementById('header-title').textContent    = cfg.heading;
  document.getElementById('header-subtitle').textContent = cfg.subtitle;

  // Start screen copy
  document.getElementById('start-intro').textContent = cfg.intro;
  document.getElementById('start-emoji').textContent  = cfg.emoji;

  // Tab active states
  document.querySelectorAll('.lang-tab').forEach(btn => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive);
  });
}

// ─── Quiz logic ───────────────────────────────────────────────────────────────

function startQuiz() {
  shuffledQuestions = shuffle(QUESTIONS[currentLang]);
  currentIndex      = 0;
  score             = 0;

  show('quiz-screen');
  hide('start-screen');
  hide('result-screen');
  renderQuestion();
}

function renderQuestion() {
  const q   = shuffledQuestions[currentIndex];
  const cfg = LANG_CONFIG[currentLang];
  const total = shuffledQuestions.length;

  // Progress
  document.getElementById('progress-bar').style.width =
    `${(currentIndex / total) * 100}%`;
  document.getElementById('question-count').textContent =
    `Question ${currentIndex + 1} of ${total}`;
  document.getElementById('score-label').textContent = `Score: ${score}`;

  // Language badge
  document.getElementById('lang-badge').textContent =
    `${cfg.flag} ${cfg.label}`;

  // Prompt + phrase
  document.getElementById('quiz-prompt').textContent = cfg.prompt;
  document.getElementById('phrase').textContent      = q.phrase;

  // Reset feedback & next button
  const feedback = document.getElementById('feedback');
  feedback.className  = 'feedback hidden';
  feedback.textContent = '';
  document.getElementById('next-btn').classList.add('hidden');

  // Build shuffled answer buttons
  const choicesEl = document.getElementById('choices');
  choicesEl.innerHTML = '';
  shuffle([q.correct, ...q.wrong]).forEach(choice => {
    const btn = document.createElement('button');
    btn.className   = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => handleAnswer(choice, q.correct));
    choicesEl.appendChild(btn);
  });
}

function handleAnswer(selected, correct) {
  const cfg = LANG_CONFIG[currentLang];

  document.querySelectorAll('.choice-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.classList.add('correct');
    else if (btn.textContent === selected) btn.classList.add('wrong');
  });

  const isCorrect = selected === correct;
  if (isCorrect) score++;

  const feedback = document.getElementById('feedback');
  feedback.textContent = isCorrect
    ? cfg.correct
    : `✗ The answer was: "${correct}"`;
  feedback.className = `feedback ${isCorrect ? 'correct' : 'wrong'}`;

  document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= shuffledQuestions.length) showResults();
  else renderQuestion();
}

function showResults() {
  hide('quiz-screen');
  show('result-screen');

  document.getElementById('progress-bar').style.width = '100%';
  document.getElementById('final-score').textContent  = `${score} / 20`;

  const pct = score / 20;
  const r   = LANG_CONFIG[currentLang].results;
  const tier = pct === 1   ? r.perfect
             : pct >= 0.8  ? r.great
             : pct >= 0.6  ? r.good
             : pct >= 0.4  ? r.ok
             :               r.retry;

  document.getElementById('result-icon').textContent    = tier.icon;
  document.getElementById('result-title').textContent   = tier.title;
  document.getElementById('result-message').textContent = tier.msg;
}

// ─── Event listeners ──────────────────────────────────────────────────────────

document.querySelectorAll('.lang-tab').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('next-btn').addEventListener('click', nextQuestion);
document.getElementById('restart-btn').addEventListener('click', () => {
  hide('result-screen');
  show('start-screen');
});
