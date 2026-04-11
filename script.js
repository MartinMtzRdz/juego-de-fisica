const questions = [
  {
    question: "¿Fórmula del calor específico?",
    answers: ["Q = m·c·ΔT", "V = I·R", "F = m·a"],
    correct: 0,
    explanation: "Se usa para calcular el calor transferido."
  },
  {
    question: "¿Qué establece la ley de Ohm?",
    answers: ["Relación V, I y R", "Movimiento", "Energía"],
    correct: 0,
    explanation: "V = I·R"
  },
  {
    question: "¿Qué material atrae un imán?",
    answers: ["Plástico", "Hierro", "Madera"],
    correct: 1,
    explanation: "Los imanes atraen materiales ferromagnéticos."
  }
];

questions.sort(() => Math.random() - 0.5);

let current = 0;
let score = 0;
let lives = 3;
let level = 1;

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartGame);

function startGame() {
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  const q = questions[current];

  document.getElementById("level").innerText = "Nivel " + level;
  document.getElementById("question").innerText = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.innerText = ans;
    btn.addEventListener("click", () => checkAnswer(i));
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(index) {
  const q = questions[current];

  const buttons = document.querySelectorAll("#answers button");
  buttons.forEach(btn => btn.disabled = true);

  if (index === q.correct) {
    score += 10;
    document.getElementById("feedback").innerText =
      "✅ Correcto: " + q.explanation;
  } else {
    lives--;
    document.getElementById("feedback").innerText =
      "❌ Incorrecto: " + q.explanation;
  }

  updateUI();

  if (lives === 0) endGame();
}

function nextQuestion() {
  current++;
  level++;
  document.getElementById("feedback").innerText = "";

  if (current < questions.length) {
    loadQuestion();
  } else {
    endGame();
  }
}

function updateUI() {
  document.getElementById("score").innerText = "Puntaje: " + score;
  document.getElementById("lives").innerText = "❤️".repeat(lives);
}

function endGame() {
  document.getElementById("gameScreen").classList.add("hidden");
  document.getElementById("endScreen").classList.remove("hidden");
  document.getElementById("finalScore").innerText =
    "Tu puntaje fue: " + score;
}

function restartGame() {
  current = 0;
  score = 0;
  lives = 3;
  level = 1;

  document.getElementById("endScreen").classList.add("hidden");
  document.getElementById("startScreen").classList.remove("hidden");
}