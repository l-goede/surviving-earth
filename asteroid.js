class Asteroid {
  constructor(image, x, y, size, moveX, moveY) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.size = size;
    this.moveX = moveX;
    this.moveY = moveY;
  }
  move() {
    this.x = this.x + this.moveX;
    this.y = this.y + this.moveY;
  }
}
