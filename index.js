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
const canvasLeft = canvas.offsetLeft + canvas.clientLeft;
const canvasTop = canvas.offsetTop + canvas.clientTop;

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
let earthX = 380,
  earthY = 200;
let asteroidX = 250,
  asteroidY = 50;

let incX = 1,
  incY = 1;

//----------------------------------------------------------------
//                           FUNCTIONS
//----------------------------------------------------------------

function drawEarth() {
  ctx.drawImage(earth, earthX, earthY, 100, 100);
}

function drawAsteroid() {
  ctx.drawImage(asteroid, asteroidX, asteroidY, 40, 40);
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawEarth();
  drawAsteroid();

  asteroidX = asteroidX + incX;
  asteroidY = asteroidY + incY;

  //Smahing asteroid
  canvas.addEventListener((event) => {
    let canvasX = event.pageX - canvasLeft;
    let canvasY = event.pageY - canvasTop;
  });

  // collision with earth
  if (
    (asteroidX + asteroid.width > earthX && asteroidX < earthX + earth.width) ||
    (asteroidY + asteroid.height > earth.height &&
      asteroidY < earthY + earth.height)
  ) {
    isGameOver = true;
  }

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
