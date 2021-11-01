// class Asteroid {
//   constructor() {
//     this.image = image;
//     this.sound = 0;
//     this.size = Math.floor(Math.random() * 70) + 30;
//     this.x = Math.floor(Math.random() * (ctx.canvas.width - this.size));
//     this.y = Math.floor(Math.random() * (ctx.canvas.height - this.size));
//   }

//   drawAsteroid() {
//     this.image = new Image();
//     this.image.src = "./images/asteroid.png";
//   }

//   drawSelf() {
//     ctx.drawImage(this.virusImg, this.x, this.y, this.size, this.size);
//   }
// }

//----------------------------------------------------------------
//                            DECLARATION
//----------------------------------------------------------------

let startScreen = document.querySelector(".startScreen");
let startBtn = document.querySelector("#start");
let restartBtn = document.querySelector("#restart");
let gameOverScreen = document.querySelector(".gameOver");
let canvas = document.querySelector("#gameScreen");
canvas.style.border = "2px solid red";
let ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, canvas.width, canvas.height);

//----------------------------------------------------------------
//                            IMAGES
//----------------------------------------------------------------

let earth = new Image();
earth.src = "./images/earth.png";

let asteroid = new Image();
asteroid.src = "./images/asteroid.png";

//----------------------------------------------------------------
//                            VARIABLES
//----------------------------------------------------------------

let intervalId = 0;
let isGameOver = false;
let score = 0;
let earthX = 380,
  earthY = 200;
let asteroidX = 250,
  asteroidY = 50;
let asteroidWidth = 40,
  asteroidHeight = 40;
let earthWidth = 100,
  earthHeight = 100;

let incX = 0.6,
  incY = 0.6;
let isMousePressed = false;

//----------------------------------------------------------------
//                           FUNCTIONS
//----------------------------------------------------------------

function drawEarth() {
  ctx.drawImage(earth, earthX, earthY, earthWidth, earthHeight);
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
let asteroids = [
  { x: 0, y: 0 },
  { x: 300, y: 0 },
  { x: 100, y: -100 },
  { x: 20, y: -300 },
  { x: 0, y: 0 },
];

let myEvent = {};

function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawEarth();
  for (i = 0; i < asteroids.length; i++) {
    ctx.drawImage(
      asteroid,
      asteroids[i].x,
      asteroids[i].y,
      asteroidWidth,
      asteroidHeight
    );
    asteroids[i].x += Math.cos((earthWidth * Math.PI) / 180);
    asteroids[i].y += Math.sin((earthHeight * Math.PI) / 180);

    if (isMousePressed) {
      const canvasLeft = canvas.offsetLeft + canvas.clientLeft;
      const canvasTop = canvas.offsetTop + canvas.clientTop;
      let canvasX = myEvent.pageX - canvasLeft;
      let canvasY = myEvent.pageY - canvasTop;
      if (
        canvasX > asteroids[i].x &&
        canvasX < asteroids[i].x + asteroid.width &&
        canvasY > asteroids[i].y &&
        canvasY < asteroids[i].y + asteroid.height
      ) {
        score++;
        asteroids[i].x = 0;
        asteroids[i].y = -30;
      }
    }
  }

  // collision with earth
  if (
    asteroidX + asteroidWidth > earthX &&
    asteroidX < earthX + earthWidth &&
    asteroidY + asteroidHeight > earthHeight &&
    asteroidY < earthY + earthHeight
  ) {
    isGameOver = true;
  }
  ctx.fillStyle = "white";
  ctx.fillText(`Your score:${score}`, 200, 500);

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

//Smahing asteroid
canvas.addEventListener("mousedown", (event) => {
  myEvent = event;
  isMousePressed = true;
});

canvas.addEventListener("mouseup", (event) => {
  isMousePressed = false;
});
