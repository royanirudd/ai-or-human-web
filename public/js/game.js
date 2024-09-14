document.addEventListener('DOMContentLoaded', () => {
  const question = document.getElementById('question');
  const humanBtn = document.getElementById('human-btn');
  const aiBtn = document.getElementById('ai-btn');
  const scoreValue = document.getElementById('score-value');
  const leaderboardList = document.getElementById('leaderboard-list');

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
      updateHighScore(score);
    } else {
      gameOver();
    }
    loadNewQuestion();
  }

  function updateHighScore(score) {
    fetch('/game/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score }),
    });
  }

  function gameOver() {
    alert(`Game Over! Your score: ${score}`);
    score = 0;
    scoreValue.textContent = score;
    updateLeaderboard();
  }

  function updateLeaderboard() {
    fetch('/game/leaderboard')
      .then(response => response.json())
      .then(data => {
        leaderboardList.innerHTML = '';
        data.forEach((user, index) => {
          const li = document.createElement('li');
          li.textContent = `${index + 1}. ${user.name}: ${user.highScore}`;
          leaderboardList.appendChild(li);
        });
      });
  }

  loadNewQuestion();
  updateLeaderboard();
});
