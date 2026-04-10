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
  },
  {
    question: "¿Qué es un electroimán?",
    answers: ["Un imán natural", "Un imán con corriente eléctrica", "Un metal"],
    correct: 1,
    explanation: "Se genera al pasar corriente por un conductor."
  },
  {
    question: "¿Qué pasa si aumenta la temperatura?",
    answers: ["Aumenta la energía térmica", "Disminuye la masa", "Nada"],
    correct: 0,
    explanation: "La energía térmica aumenta con la temperatura."
  },
  {
    question: "¿Qué unidad tiene la corriente eléctrica?",
    answers: ["Voltios", "Amperios", "Ohms"],
    correct: 1,
    explanation: "Se mide en amperios (A)."
  },
  {
    question: "¿Qué mide el voltaje?",
    answers: ["Corriente", "Diferencia de potencial", "Resistencia"],
    correct: 1,
    explanation: "El voltaje es la diferencia de potencial."
  },
  {
    question: "¿Qué representa la resistencia?",
    answers: ["Paso de corriente", "Oposición al flujo", "Energía"],
    correct: 1,
    explanation: "Es la oposición al paso de corriente."
  },
  {
    question: "¿Qué sucede si aumenta la resistencia?",
    answers: ["Disminuye la corriente", "Aumenta la corriente", "Nada"],
    correct: 0,
    explanation: "Según la ley de Ohm."
  },
  {
    question: "¿Qué tipo de energía es el calor?",
    answers: ["Mecánica", "Térmica", "Eléctrica"],
    correct: 1,
    explanation: "El calor es energía térmica."
  },
  {
    question: "¿Qué produce un campo magnético?",
    answers: ["Corriente eléctrica", "Luz", "Sonido"],
    correct: 0,
    explanation: "La corriente genera campo magnético."
  },
  {
    question: "¿Qué instrumento mide la corriente?",
    answers: ["Voltímetro", "Amperímetro", "Termómetro"],
    correct: 1,
    explanation: "El amperímetro mide la corriente."
  },
  {
    question: "¿Qué instrumento mide la temperatura?",
    answers: ["Termómetro", "Voltímetro", "Regla"],
    correct: 0,
    explanation: "El termómetro mide la temperatura."
  }
];

questions.sort(() => Math.random() - 0.5);

let current = 0;
let score = 0;
let lives = 3;
let level = 1;

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
    btn.onclick = () => checkAnswer(i);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(index) {
  const q = questions[current];

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

  if (lives === 0) {
    endGame();
  }
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