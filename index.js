let startScreen = document.querySelector(".startScreen");
let startBtn = document.querySelector("#start");
let restartBtn = document.querySelector("#restart");
let gameOverScreen = document.querySelector(".gameOver");
let canvas = document.querySelector("#gameScreen");
let ctx = canvas.getContext("2d");

ctx.fillRect(0, 0, canvas.width, canvas.height);

//----------------------------------------------------------------
//                            IMAGES
//----------------------------------------------------------------

let earth = new Image();
earth.src = "./images/earth.png";

let asteroid = new Image();
asteroid.src = "./images/fire-asteroid.png";

// let fireEarth = new Image();
// fireEarth.src = "./images/earth-on-fire.png";

//----------------------------------------------------------------
//                            VARIABLES
//----------------------------------------------------------------

let intervalId = 0;
let isGameOver = false;
let asteroidX = 50,
  asteroidY = 50;
let incX = 2,
  incY = 2;

//----------------------------------------------------------------
//                           FUNCTIONS
//----------------------------------------------------------------

function drawEarth() {
  ctx.drawImage(earth, 380, 200, 100, 100);
}

function drawAsteroid() {
  ctx.translate(asteroid.width / 2, asteroid.height / 2);
  ctx.rotate((315 * Math.PI) / 180);
  ctx.drawImage(asteroid, asteroidX, asteroidY, 50, 50);
}

function handleStart() {
  startScreen.style.display = "none";
  canvas.style.display = "block";
  drawEarth();
  game();
}

function showGameOver() {
  canvas.style.display = "none";
  gameOverScreen.style.display = "block";
}

function game() {
  drawAsteroid();
  asteroidX = asteroidX + incX;
  asteroidY = asteroidY + incY;

  if (isGameOver) {
    cancelAnimationFrame(intervalId);
    showGameOver();
  } else {
    intervalId = requestAnimationFrame(game);
  }
}

//----------------------------------------------------------------
//                             EVENTS
//----------------------------------------------------------------

window.addEventListener("load", () => {
  canvas.style.display = "none";
  gameOverScreen.style.display = "none";
  handleStart();
});

startBtn.addEventListener("click", () => {
  handleStart();
});

restartBtn.addEventListener("click", () => {
  handleStart();
});
