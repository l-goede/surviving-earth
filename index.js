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

let dust = new Image();
dust.src = "./images/dust.png";
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
let asteroidWidth = 80,
  asteroidHeight = 80;
let earthWidth = 100,
  earthHeight = 100;
let speedX = 0.9,
  speedY = 0.9;

let isMousePressed = false;

//----------------------------------------------------------------
//                           FUNCTIONS
//----------------------------------------------------------------

function drawEarth() {
  ctx.drawImage(earth, earthX, earthY, earthWidth, earthHeight);
}
//function drawDust(){
//  ctx.drawImage(dust, dustX, dustY,dustWidth, dustHeight);
//}

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
// let asteroids = [
//   {
//     x: 0,
//     y: 0,
//     speedX: Math.round(Math.random() * 4),
//     speedY: Math.round(Math.random() * 4),
//     direction: Math.random() * 360,
//   },
//   { x: 200, y: 0, speedX: 1, speedY: 1, direction: Math.random() * 360 },
//   {
//     x: Math.random() * 300,
//     y: Math.random() * 300,
//     speedX: 1,
//     speedY: 1,
//     direction: Math.random() * 360,
//   },
// ];
let asteroids = [];
let myEvent = {};

for (let i = 0; i < 5; i++) {
  let randomAsteroid = {
    speedX: Math.round(Math.random() * 4),
    speedY: Math.round(Math.random() * 4),
    direction: Math.random() * 360,
  };
  if (Math.random() < 0.5) {
    randomAsteroid.x = -asteroidWidth;
    randomAsteroid.y =
      Math.round(Math.random() * canvas.height) + canvas.height;
  } else {
    randomAsteroid.y = -asteroidHeight;
    randomAsteroid.x = Math.round(Math.random() * canvas.width) + canvas.width;
  }
  asteroids.push(randomAsteroid);
}

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

    let angleX = earthX - asteroids[i].x;
    let angleY = earthY - asteroids[i].y;
    let angle = Math.atan2(angleY, angleX);
    asteroids[i].x += asteroids[i].speedX * Math.cos(angle);
    asteroids[i].y += asteroids[i].speedY * Math.sin(angle);

    if (isMousePressed) {
      const canvasLeft = canvas.offsetLeft + canvas.clientLeft;
      const canvasTop = canvas.offsetTop + canvas.clientTop;
      let canvasX = myEvent.pageX - canvasLeft;
      let canvasY = myEvent.pageY - canvasTop;
      if (
        canvasX > asteroids[i].x &&
        canvasX < asteroids[i].x + asteroidWidth &&
        canvasY > asteroids[i].y &&
        canvasY < asteroids[i].y + asteroidHeight
      ) {
        score++;

        asteroids[i].speedX = Math.round(Math.random() * 3.5);
        asteroids[i].speedY = Math.round(Math.random() * 3.5);
        // asteroids[i].x = -Math.round((Math.random() * canvas.width) / 5);
        // asteroids[i].y = -Math.round((Math.random() * canvas.height) / 5);
        if (Math.random() < 0.5) {
          asteroids[i].x = -asteroidWidth;
          asteroids[i].y = Math.round(Math.random() * canvas.height);
        } else {
          asteroids[i].y = -asteroidHeight;

          asteroids[i].x = Math.round(Math.random() * canvas.width);
        }
      }
    }
    // collision with earth
    if (
      asteroids[i].x + asteroidWidth > earthX &&
      asteroids[i].x < earthX + earthWidth &&
      asteroids[i].y + asteroidHeight > earthY &&
      asteroids[i].y < earthY + earthHeight
    ) {
      isGameOver = true;
    }
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
