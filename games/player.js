var normalSize = new Vector(33, 82);
var parachuteSize = new Vector(33, 112);
var diffSizes = new Vector(0, 30);
var negdiffSizes = new Vector(0, -30);

function Player(pos) {
  this.pos = pos;
  this.size = normalSize;
  this.speed = new Vector(0, 0);
  this.movementType = "normal";
}
Player.prototype.type = "player";

var playerXSpeed = 200;
var gravity = 800;
var jumpSpeed = 400;
var maxSpeed = 500;

Player.prototype.moveX = function(step, level, keys) {
  this.speed.x = 0;
  if (keys.left) this.speed.x -= playerXSpeed;
  if (keys.right) this.speed.x += playerXSpeed;

  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle != "wall" && level.status == null)
    this.pos = newPos;
};

Player.prototype.moveY = function(step, level, keys) {
  this.speed.y += (this.movementType == "normal") ? (step * gravity) : 0;
  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle) {
    if (this.movementType == "parachute") {
        this.movementType = "normal";
        this.size = normalSize;
        this.pos = this.pos.plus(diffSizes);
    }
    if (keys.up && this.speed.y > 0 && level.status == null) {
      this.speed.y = -jumpSpeed;
      var motion = new Vector(0, this.speed.y * step);
      this.pos = this.pos.plus(motion);
    } else {
      this.speed.y = 0;}
  } else if (level.status == null) {
    if (this.speed.y > maxSpeed && this.movementType == "normal") {
      this.movementType = "parachute";
      this.size = parachuteSize;
      this.pos = this.pos.plus(negdiffSizes);
    }
    this.pos = this.pos.plus(motion);
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
