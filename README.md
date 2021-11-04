# Surviving Earth

## Description

Survivng Earth is a game where the player must fend off the asteroids from the Earth to save it.
The game ends when an asteroid hits the earth.

## MVP (DOM - CANVAS)

- game has an earthball which is located in the bottom
- asteroids target the earth
- per mouse click on asteroids they explode
- asteroids appear randomly from the left,right,top of the screen
- asteroids change speed randomly
- number of asteroids increase gradually and randomly
- when one asteroids hits the earth the game ends
- score counts how many asteroids were hit

## Backlog

- add music
- Multiple levels to increase the difficulty- more asteroids appear which should not smashed

## Data Structure

# main.js

- buildSplashScreen () {}
- buildGameScreen () {}
- buildGameOverScreen () {}

# game.js

- Game () {}
- Loop () {}
- checkCollisions () {}
- clearCanvas () {}
- updateCanvas () {}
- drawCanvas () {}
- GameOver () {}

# ship.js

- asteroids () {
  this.x;
  this.y;
  this.direction;
  this.interval
  }
- draw () {}
- move () {}
- speed () {}
- amount(){}
- checkScreenCollision () {}

# earth.js

- Earth () {
  this.x;
  this.y;

  }

- draw () {}

- checkCollision () {}

## States y States Transitions

Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameOverScreen

## Task

- main - buildDom
- main - buildSplashScreen
- main - addEventListener
- main - buildGameScreen
- main - buildGameOverScreen
- game - startLoop
- game - buildCanvas
- game - updateCanvas
- game - drawCanvas
- asteroids - draw
- asteroids - move
- asteroids- increase
- asteroids-speed up
- asteroids- addEventListener
- game - checkCollision
- earth - draw
- earth - checkCollision
- game - GameOver
- game - addEventListener

## Links

URls for the project repo and deploy
[Link Repo](https://github.com/l-goede/surviving earth)
[Link Deploy]()

### Slides

URls for the project presentation (slides)
[https://docs.google.com/presentation/d/1SD9l5ZXs7N8Ts6TwTwtMXGvqA-bsNa9RsthabSkUW7E/edit?usp=sharing]()
