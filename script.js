const responses = {
  stress: [
    "It's okay to feel overwhelmed. Take a deep breath—you’re doing your best.",
    "You don’t have to solve everything today. One step at a time.",
    "Pause. Breathe in slowly… and out. You’re safe right now.",
    "Stress is temporary. You’ve handled tough things before."
  ],
  sad: [
    "Your feelings are valid. You don’t have to hide them.",
    "Even the darkest nights end with sunrise.",
    "You are not alone in this—many people care about you.",
    "It’s okay to cry. It’s part of healing."
  ],
  anxiety: [
    "Right now, focus on your breath. In… and out… slowly.",
    "You are not your thoughts. They will pass.",
    "Try grounding yourself—name 5 things you can see.",
    "This feeling will fade. You are in control."
  ],
  angry: [
    "Take a moment before reacting. Your peace matters.",
    "Breathe deeply—anger passes quicker than you think.",
    "You deserve calm, not chaos.",
    "Let it go slowly. You don’t need to carry this."
  ],
  default: [
    "I’m here for you. Tell me more if you’d like.",
    "You’re stronger than you think.",
    "Every problem has a solution—even if it takes time.",
    "Be kind to yourself today."
  ]
};

function detectEmotion(text) {
  text = text.toLowerCase();

  if (text.includes("stress") || text.includes("tired") || text.includes("overwhelmed")) return "stress";
  if (text.includes("sad") || text.includes("depressed") || text.includes("unhappy")) return "sad";
  if (text.includes("anxiety") || text.includes("fear") || text.includes("worried")) return "anxiety";
  if (text.includes("angry") || text.includes("mad") || text.includes("hate")) return "angry";

  return "default";
}

function generateResponse() {
  const input = document.getElementById("userInput").value;
  const emotion = detectEmotion(input);

  const options = responses[emotion];
  const random = options[Math.floor(Math.random() * options.length)];

  document.getElementById("responseBox").innerText = random;
}

function startBreathing() {
  const box = document.getElementById("responseBox");

  let steps = [
    "Breathe in... (4 seconds)",
    "Hold... (4 seconds)",
    "Breathe out... (6 seconds)",
    "Repeat... 🌿"
  ];

  let i = 0;

  const interval = setInterval(() => {
    box.innerText = steps[i];
    i++;

    if (i >= steps.length) {
      clearInterval(interval);
    }
  }, 3000);
}
