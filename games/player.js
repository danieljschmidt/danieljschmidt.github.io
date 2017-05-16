function Player(pos) {
  this.pos = pos;
  this.size = new Vector(30, 78); // TODO
  this.speed = new Vector(0, 0);
}
Player.prototype.type = "player";

var playerXSpeed = 200;

Player.prototype.moveX = function(step, level, keys) {
  this.speed.x = 0;
  if (keys.left) this.speed.x -= playerXSpeed;
  if (keys.right) this.speed.x += playerXSpeed;

  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle != "wall")
    this.pos = newPos;
};

var gravity = 800;
var jumpSpeed = 400;

Player.prototype.moveY = function(step, level, keys) {
  this.speed.y += step * gravity;
  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle) {
    if (keys.up && this.speed.y > 0) {
      this.speed.y = -jumpSpeed;
      var motion = new Vector(0, this.speed.y * step);
      this.pos = this.pos.plus(motion);
    } else {
      this.speed.y = 0;}
  } else {
    this.pos = newPos;
  }
};

Player.prototype.act = function(step, level, keys) {
  this.moveX(step, level, keys);
  this.moveY(step, level, keys);

  var object = level.playerAt(this);
  if (object)
    level.playerTouched(object.type, object);
};

var arrowCodes = {37: "left", 38: "up", 39: "right"};

function trackKeys(codes) {
  var pressed = Object.create(null);
  function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      var down = event.type == "keydown";
      pressed[codes[event.keyCode]] = down;
      event.preventDefault();
    }
  }
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  return pressed;
}

var arrows = trackKeys(arrowCodes);
