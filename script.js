const gameArea = document.getElementById('gameArea');
const scoreBoard = document.getElementById('scoreBoard');
const levelBoard = document.getElementById('levelBoard');
let score = 0;
let level = 1;
let heartInterval = 700;
let gameInterval;

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');

  if (Math.random() < 0.15) heart.classList.add('special');

  const x = Math.random() * (gameArea.offsetWidth - 50);
  heart.style.left = `${x}px`;

  const duration = 4 - level * 0.3 + Math.random() * 2;
  heart.style.animationDuration = `${Math.max(duration, 1)}s`;

  gameArea.appendChild(heart);

  heart.addEventListener('click', () => {
    score += heart.classList.contains('special') ? 3 : 1;
    scoreBoard.textContent = `Puntuación: ${score}`;
    showConfetti(parseFloat(heart.style.left), heart.offsetTop);
    heart.style.transform = 'scale(1.5)';
    heart.style.opacity = '0';
    setTimeout(() => heart.remove(), 300);
  });

  heart.addEventListener('animationend', () => heart.remove());
}

function showConfetti(x, y) {
  for (let i = 0; i < 15; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 60%)`;
    gameArea.appendChild(confetti);

    const dx = (Math.random() - 0.5) * 100;
    const dy = (Math.random() - 0.5) * 100;
    confetti.animate([
      { transform: `translate(0,0)`, opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
    ], { duration: 800, easing: 'ease-out' });

    setTimeout(() => confetti.remove(), 800);
  }
}

function checkLevel() {
  const newLevel = Math.floor(score / 10) + 1;
  if (newLevel > level) {
    level = newLevel;
    levelBoard.textContent = `Nivel: ${level}`;
    clearInterval(gameInterval);
    heartInterval = Math.max(200, heartInterval - 100);
    gameInterval = setInterval(createHeart, heartInterval);
  }
}

gameInterval = setInterval(createHeart, heartInterval);
setInterval(checkLevel, 500);
