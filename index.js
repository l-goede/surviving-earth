//----------------------------------------------------------------
//                            DECLARATION
//----------------------------------------------------------------

let startScreen = document.querySelector(".startScreen");
let startBtn = document.querySelector("#start");
let restartBtn = document.querySelector("#restart");
let gameOverScreen = document.querySelector(".gameOverScr");
let canvas = document.querySelector("#gameScreen");
canvas.style.background = "./images/space-background.png";
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
//                            AUDIO
//----------------------------------------------------------------

let gameAudio = new Audio("./gameAudio.mp3");
gameAudio.volume = 0.04;
let hitAsteroidAudio = new Audio("./hitAsteroidAudio.mp3");
hitAsteroidAudio.volume = 0.2;
let gameOverAudio = new Audio("./gameOverAudio.mp3");
gameOverAudio.volume = 0.2;

//----------------------------------------------------------------
//                            VARIABLES
//----------------------------------------------------------------

let intervalId = 0;
let isGameOver = false;
let score = 0;
let earthX = canvas.width / 2,
  earthY = canvas.height / 2.5;
let earthWidth = 100,
  earthHeight = 100;

let asteroidWidth = 59,
  asteroidHeight = 59;
let speedX = 0.9,
  speedY = 0.9;
let isMousePressed = false;
let dustX = 300,
  dustY = 300;
let dustWidth = 55,
  dustHeight = 55;

//----------------------------------------------------------------
//                           FUNCTIONS
//----------------------------------------------------------------

function drawEarth() {
  ctx.drawImage(earth, earthX, earthY, earthWidth, earthHeight);
}

function handleStart() {
  startScreen.style.display = "none";
  canvas.style.display = "flex";
  gameAudio.currentTime = 0;
  gameAudio.play();
  gameAudio.loop = true;
  drawEarth();
  game();
}

function showGameOver() {
  canvas.style.display = "none";
  gameOverScreen.style.display = "flex";
}
let inititalAsteroidCount = 8;
let asteroids = [];
let myEvent = {};
let paintAsteroid = false;

function createAsteroids(asteroidCount) {
  for (let i = 0; i < asteroidCount; i++) {
    let randomAsteroid = {
      speedX: Math.round(Math.random() * 2.5),
      speedY: Math.round(Math.random() * 2.5),
      direction: Math.random() * 360,
    };
    if (Math.random() < 0.5) {
      randomAsteroid.x = -asteroidWidth;
      randomAsteroid.y =
        Math.round(Math.random() * canvas.height) + canvas.height;
    } else {
      randomAsteroid.y = -asteroidHeight;
      randomAsteroid.x =
        Math.round(Math.random() * canvas.width) + canvas.width;
    }
    asteroids.push(randomAsteroid);
  }
}
createAsteroids(inititalAsteroidCount);
let animationCount = 0;
function game() {
  animationCount++;
  if (animationCount == 60) {
    paintAsteroid = false;
    hitAsteroidAudio.pause();
    hitAsteroidAudio.currentTime = 0;
    animationCount = 0;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawEarth();
  if (paintAsteroid) {
    ctx.drawImage(dust, dustX, dustY, dustWidth, dustHeight);
  }
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

    //Mouse click on asteroid- collision

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
        dustX = asteroids[i].x;
        dustY = asteroids[i].y;
        paintAsteroid = true;
        score++;
        hitAsteroidAudio.currentTime = 0;
        hitAsteroidAudio.play();

        asteroids[i].speedX = Math.round(Math.random() * 2.5);
        asteroids[i].speedY = Math.round(Math.random() * 2.5);

        if (score % 10 == 0) {
          createAsteroids(6);
        }

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
  // display score
  ctx.fillStyle = "white";
  ctx.font = "20px Roboto Mono";
  ctx.fillText(`Your score:${score}`, 10, 20);

  if (isGameOver) {
    cancelAnimationFrame(intervalId);
    gameAudio.pause();
    gameOverAudio.play();
    showGameOver();
    let span = document.querySelector("span");
    span.innerHTML = `YOUR SCORE: ${score}`;
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
});

startBtn.addEventListener("click", () => {
  handleStart();
});

restartBtn.addEventListener("click", () => {
  //reset the variables
  // reset the score
  // reset the gameOver
  //reset asteroids = []
  //call createAsteroaids(8)

  score = 0;
  isGameOver = false;
  asteroids = [];
  paintAsteroid = false;
  createAsteroids(6);
  gameOverScreen.style.display = "none";
  canvas.style.display = "flex";
  // gameOverAudio.pause();
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
