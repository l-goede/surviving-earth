class Game {
  constructor(score) {
    this.score = 0;
  }
}

function game() {
  drawEarth();
  drawAsteroid();
  if (gameOver) {
    cancelAnimationFrame(intervalId);
    showGameOver();
  } else {
    intervalId = requestAnimationFrame(game);
  }
}
