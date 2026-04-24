const QUESTIONS = [
  { spanish: "¿Dónde está la playa?",         correct: "Where is the beach?",           wrong: ["Where is the hotel?", "How far is the sea?", "Is there a pool nearby?"] },
  { spanish: "¿Cuánto cuesta?",                correct: "How much does it cost?",         wrong: ["What time is it?", "Where can I pay?", "Do you have change?"] },
  { spanish: "La cuenta, por favor.",           correct: "The bill, please.",              wrong: ["The menu, please.", "A table, please.", "The receipt, please."] },
  { spanish: "¿Habla inglés?",                  correct: "Do you speak English?",          wrong: ["Do you understand me?", "Can you translate?", "Is there a translator?"] },
  { spanish: "No entiendo.",                    correct: "I don't understand.",             wrong: ["I don't speak Spanish.", "I am lost.", "I can't hear you."] },
  { spanish: "¿Dónde está el baño?",           correct: "Where is the bathroom?",         wrong: ["Where is the exit?", "Where is the beach?", "Where is the restaurant?"] },
  { spanish: "¿Puede ayudarme?",               correct: "Can you help me?",               wrong: ["Can you repeat that?", "Can you call a taxi?", "Can you speak slower?"] },
  { spanish: "Buenos días.",                    correct: "Good morning.",                  wrong: ["Good night.", "Good afternoon.", "Have a good trip."] },
  { spanish: "Buenas noches.",                  correct: "Good night.",                    wrong: ["Good morning.", "See you tomorrow.", "Sleep well."] },
  { spanish: "Gracias.",                        correct: "Thank you.",                     wrong: ["Please.", "Sorry.", "Excuse me."] },
  { spanish: "De nada.",                        correct: "You're welcome.",                wrong: ["No problem.", "That's alright.", "Don't mention it."] },
  { spanish: "Disculpe.",                       correct: "Excuse me.",                     wrong: ["I'm sorry.", "Pardon me.", "Thank you."] },
  { spanish: "¿Dónde está el hotel?",          correct: "Where is the hotel?",            wrong: ["Where is the airport?", "Where is the bus stop?", "Where is the market?"] },
  { spanish: "Quiero un taxi.",                 correct: "I want a taxi.",                 wrong: ["I want a bus.", "I need a map.", "I want to rent a car."] },
  { spanish: "¿Tiene una habitación disponible?", correct: "Do you have a room available?", wrong: ["How much is the room?", "Can I see the room?", "Is breakfast included?"] },
  { spanish: "Estoy perdido.",                  correct: "I am lost.",                     wrong: ["I am tired.", "I am hungry.", "I am looking for my hotel."] },
  { spanish: "¿Dónde puedo cambiar dinero?",   correct: "Where can I exchange money?",    wrong: ["Where is the bank?", "How much is the exchange rate?", "Can I pay by card?"] },
  { spanish: "Una mesa para dos, por favor.",  correct: "A table for two, please.",        wrong: ["A menu for two, please.", "Two coffees, please.", "A table outside, please."] },
  { spanish: "¿A qué hora abre?",              correct: "What time does it open?",        wrong: ["What time does it close?", "Is it open today?", "When does the tour start?"] },
  { spanish: "Me gustaría reservar una mesa.", correct: "I would like to reserve a table.", wrong: ["I would like the menu.", "I would like to order.", "I would like to pay now."] },
];

let shuffledQuestions = [];
let currentIndex = 0;
let score = 0;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildChoices(question) {
  return shuffle([question.correct, ...question.wrong]);
}

function startQuiz() {
  shuffledQuestions = shuffle(QUESTIONS);
  currentIndex = 0;
  score = 0;
  show('quiz-screen');
  hide('start-screen');
  hide('result-screen');
  renderQuestion();
}

function renderQuestion() {
  const q = shuffledQuestions[currentIndex];
  const total = shuffledQuestions.length;

  document.getElementById('spanish-phrase').textContent = q.spanish;
  document.getElementById('question-count').textContent = `Question ${currentIndex + 1} of ${total}`;
  document.getElementById('score-label').textContent = `Score: ${score}`;
  document.getElementById('progress-bar').style.width = `${((currentIndex) / total) * 100}%`;

  const feedback = document.getElementById('feedback');
  feedback.className = 'feedback hidden';
  feedback.textContent = '';

  const nextBtn = document.getElementById('next-btn');
  nextBtn.classList.add('hidden');

  const choicesEl = document.getElementById('choices');
  choicesEl.innerHTML = '';
  buildChoices(q).forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => handleAnswer(choice, q.correct));
    choicesEl.appendChild(btn);
  });
}

function handleAnswer(selected, correct) {
  const buttons = document.querySelectorAll('.choice-btn');
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.classList.add('correct');
    else if (btn.textContent === selected) btn.classList.add('wrong');
  });

  const isCorrect = selected === correct;
  if (isCorrect) score++;

  const feedback = document.getElementById('feedback');
  feedback.textContent = isCorrect ? '✓ ¡Correcto!' : `✗ The answer was: "${correct}"`;
  feedback.className = `feedback ${isCorrect ? 'correct' : 'wrong'}`;

  document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= shuffledQuestions.length) {
    showResults();
  } else {
    renderQuestion();
  }
}

function showResults() {
  hide('quiz-screen');
  show('result-screen');

  document.getElementById('progress-bar').style.width = '100%';
  document.getElementById('final-score').textContent = `${score} / 20`;

  const pct = score / 20;
  let icon, title, msg;
  if (pct === 1) {
    icon = '🏆'; title = '¡Perfecto!'; msg = 'Flawless! You\'re ready to charm the whole Mediterranean coast.';
  } else if (pct >= 0.8) {
    icon = '🌊'; title = 'Excelente!'; msg = 'Almost perfect — you\'ll have no trouble on your vacation!';
  } else if (pct >= 0.6) {
    icon = '🏖️'; title = '¡Muy bien!'; msg = 'Solid effort! A bit more practice and you\'ll be fluent on the beach.';
  } else if (pct >= 0.4) {
    icon = '🐚'; title = 'Buen intento.'; msg = 'Not bad! Keep practising and those phrases will stick.';
  } else {
    icon = '☀️'; title = '¡Sigue intentando!'; msg = 'Every expert was once a beginner. Try again — you\'ve got this!';
  }

  document.getElementById('result-icon').textContent = icon;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-message').textContent = msg;
}

function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }

document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('next-btn').addEventListener('click', nextQuestion);
document.getElementById('restart-btn').addEventListener('click', startQuiz);
