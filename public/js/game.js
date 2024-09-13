document.addEventListener('DOMContentLoaded', () => {
  const question = document.getElementById('question');
  const humanBtn = document.getElementById('human-btn');
  const aiBtn = document.getElementById('ai-btn');
  const scoreValue = document.getElementById('score-value');

  let score = 0;

  function loadNewQuestion() {
    fetch('/game/question')
      .then(response => response.json())
      .then(data => {
        question.textContent = data.text;
        humanBtn.onclick = () => checkAnswer('human', data.isHuman);
        aiBtn.onclick = () => checkAnswer('ai', data.isHuman);
      });
  }

  function checkAnswer(answer, isHuman) {
    const correct = (answer === 'human' && isHuman) || (answer === 'ai' && !isHuman);
    if (correct) {
      score++;
      scoreValue.textContent = score;
    }
    loadNewQuestion();
  }

  loadNewQuestion();
});
