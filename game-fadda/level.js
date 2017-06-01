function Level(plan, number) {
  this.number = number;
  this.width = 600;
  this.height = plan.height;

  this.player = new Player(new Vector(plan.player.x, plan.player.y));

  this.mudda = new Mudda(new Vector(plan.mudda.x, plan.mudda.y));

  this.clouds = [];
  for (var i=0; i<plan.clouds.length; i++) {
      var cloud = new Cloud(new Vector(plan.clouds[i].x, plan.clouds[i].y));
      this.clouds.push(cloud);
  }

  this.nGuitars = plan.guitars.length;

  this.guitars = [];
  for (var i=0; i<plan.guitars.length; i++) {
      var guitar = new Guitar(new Vector(plan.guitars[i].x, plan.guitars[i].y));
      this.guitars.push(guitar);
  }

  this.wasps = [];
  for (var i=0; i<plan.wasps.length; i++) {
      var wasp = new Wasp(new Vector(plan.wasps[i].x, plan.wasps[i].y));
      this.wasps.push(wasp);
  }

  this.objects = this.wasps.concat(this.guitars, this.mudda);

  this.status = this.finishDelay = null;
};

Level.prototype.isFinished = function() {
  return this.status != null && this.finishDelay < 0;
};

Level.prototype.obstacleAt = function(pos, size) {
  var xStart = pos.x;
  var xEnd = pos.x + size.x;
  var yStart = pos.y;
  var yEnd = pos.y + size.y;

  if (xStart < 0 || xEnd > this.width || yStart < 0)
    return "wall";
  if (yEnd > this.height)
    return "ground";
  for (var i = 0; i < this.clouds.length; i++) {
      var cloud = this.clouds[i];
      if (this.player.pos.x + this.player.size.x > cloud.pos.x &&
        this.player.pos.x < cloud.pos.x + cloud.size.x &&
        this.player.pos.y + this.player.size.y > cloud.pos.y &&
        this.player.pos.y + this.player.size.y < cloud.pos.y + cloud.size.y)
      return "cloud";
  }
};

Level.prototype.playerAt = function(player) {
  for (var i = 0; i < this.objects.length; i++) {
    var other = this.objects[i];
    if (player.pos.x + player.size.x > other.pos.x &&
        player.pos.x < other.pos.x + other.size.x &&
        player.pos.y + player.size.y > other.pos.y &&
        player.pos.y < other.pos.y + other.size.y)
      return other;
  }
};

var maxStep = 0.05;

Level.prototype.animate = function(step, keys) {
  if (this.status != null)
    this.finishDelay -= step;

  while (step > 0) {
    var thisStep = Math.min(step, maxStep);
    this.player.act(thisStep, this, keys);
    var level = this;
    this.wasps.forEach(function(wasp) {
        wasp.act(thisStep, level);
    });
    step -= thisStep;
  }
};


Level.prototype.playerTouched = function(type, object) {
    if (type == "wasp" && this.status == null) {
        this.status = "lost";
        this.finishDelay = 1;
    } else if (type == "guitar") {
        this.guitars = this.guitars.filter(function(e) {
            return e !== object;}
        );
    } else if (type == "mudda" && this.guitars.length == 0 && this.status == null) {
        this.status = "won";
        this.finishDelay = 1;
    } else if (type == "mudda" && this.guitars.length > 0 && this.status == null) {
        this.status = "lost";
        this.finishDelay = 1;
    };
};
