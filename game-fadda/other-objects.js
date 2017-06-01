function Cloud(pos) {
  this.pos = pos;
  this.size = new Vector(99, 57);
}

Cloud.prototype.type = "cloud";

function Guitar(pos) {
  this.pos = pos;
  this.size = new Vector(36, 102);
}

Guitar.prototype.type = "guitar";

function Mudda(pos) {
    this.pos = pos;
    this.size = new Vector(37, 80);
}

Mudda.prototype.type = "mudda";

function Wasp(pos) {
  this.pos = pos;
  this.size = new Vector(57, 35);
  var speedX =  randomBinary() * (Math.random() * 200 + 100);
  this.speed = new Vector(speedX, 0);
}

Wasp.prototype.type = "wasp";

Wasp.prototype.act = function(step, level) {
  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.pos.plus(motion);
  if (newPos.x < 0) {
    this.speed.x = - this.speed.x;
} else if (newPos.x + this.size.x > level.width) {
    this.speed.x = - this.speed.x;
  } else {
    this.pos = newPos;
  };
};

function randomBinary() {
    if (Math.random() > 0.5) {
        return 1;
    } else {
        return -1;
    };
};
