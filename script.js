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
  },
  {
    question: "Unidad del calor específico",
    answers: ["J/kg°C", "Voltios", "Newton"],
    correct: 0,
    explanation: "Energía por unidad de masa y temperatura."
  },
  {
    question: "¿Qué es un campo magnético?",
    answers: ["Región donde actúa un imán", "Una fuerza", "Un objeto"],
    correct: 0,
    explanation: "Es el área donde se perciben fuerzas magnéticas."
  }
];

// 🔀 Mezclar preguntas (ya no se repiten)
questions.sort(() => Math.random() - 0.5);

let current = 0;
let score = 0;
let lives = 3;
let level = 1;

// ⏱️ TIMER
let tiempo = 10;
let intervalo;

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

  // 🔀 Mezclar respuestas correctamente
  let opciones = q.answers.map((ans, i) => ({
    texto: ans,
    correcta: i === q.correct
  }));

  opciones.sort(() => Math.random() - 0.5);

  opciones.forEach(op => {
    const btn = document.createElement("button");
    btn.innerText = op.texto;
    btn.addEventListener("click", () => checkAnswer(op.correcta));
    answersDiv.appendChild(btn);
  });

  iniciarTimer(); // ⏱️ iniciar tiempo
}

function checkAnswer(esCorrecta) {
  const q = questions[current];

  clearInterval(intervalo);

  const buttons = document.querySelectorAll("#answers button");
  buttons.forEach(btn => btn.disabled = true);

  if (esCorrecta) {
    score += 10;
    document.getElementById("feedback").innerText =
      "✅ Correcto: " + q.explanation;
  } else {
    lives--;
    document.getElementById("feedback").innerText =
      "❌ Incorrecto: " + q.explanation;
  }

  updateUI();

  if (lives === 0) endGame("vidas");
}

function nextQuestion() {
  current++;
  level++;
  document.getElementById("feedback").innerText = "";

  if (current < questions.length) {
    loadQuestion();
  } else {
    endGame("completado");
  }
}

function updateUI() {
  document.getElementById("score").innerText = "Puntaje: " + score;
  document.getElementById("lives").innerText = "❤️".repeat(lives);
}

function iniciarTimer() {
  clearInterval(intervalo);
  tiempo = 10;

  const timerText = document.getElementById("timer");
  if (timerText) timerText.innerText = "Tiempo: " + tiempo;

  intervalo = setInterval(() => {
    tiempo--;

    if (timerText) timerText.innerText = "Tiempo: " + tiempo;

    if (tiempo <= 0) {
      clearInterval(intervalo);
      lives--;
      document.getElementById("feedback").innerText =
        "⏱️ Se acabó el tiempo";

      updateUI();

      if (lives === 0) {
        endGame("vidas");
      } else {
        nextQuestion();
      }
    }
  }, 1000);
}

function endGame(motivo) {
  document.getElementById("gameScreen").classList.add("hidden");
  document.getElementById("endScreen").classList.remove("hidden");

  if (motivo === "vidas") {
    document.getElementById("finalScore").innerText =
      "💀 Perdiste, te quedaste sin vidas\nPuntaje: " + score;
  } else {
    document.getElementById("finalScore").innerText =
      "🎉 Terminaste el quiz\nPuntaje: " + score;
  }
}

function restartGame() {
  current = 0;
  score = 0;
  lives = 3;
  level = 1;

  document.getElementById("endScreen").classList.add("hidden");
  document.getElementById("startScreen").classList.remove("hidden");
}