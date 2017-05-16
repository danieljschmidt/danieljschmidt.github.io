function CanvasDisplay(parent, level) {
  this.canvas = document.createElement("canvas");
  this.canvas.width = level.width;
  this.canvas.height = Math.min(900, level.height);
  parent.appendChild(this.canvas);
  this.cx = this.canvas.getContext("2d");

  this.level = level;
  this.animationTime = 0;
  this.flipPlayer = false; // ?

  this.viewport = {
    left: 0,
    top: 0,
    width: this.canvas.width,
    height: this.canvas.height,
  };

  this.drawFrame(0);
};

CanvasDisplay.prototype.clear = function() {
  this.canvas.parentNode.removeChild(this.canvas);
};

CanvasDisplay.prototype.drawFrame = function(step) {
  this.animationTime += step;

  this.updateViewport();
  this.drawBackground(this.level);
  this.drawClouds();
  this.drawGuitars();
  this.drawWasps();
  this.drawPlayer();
};

CanvasDisplay.prototype.updateViewport = function() {
  var view = this.viewport;
  var margin = view.width / 3;
  var player = this.level.player;
  var center = player.pos.plus(player.size.times(0.5));

  if (center.x < view.left + margin)
    view.left = Math.max(center.x - margin, 0);
  else if (center.x > view.left + view.width - margin)
    view.left = Math.min(center.x + margin - view.width,
                         this.level.width - view.width);
  if (center.y < view.top + margin)
    view.top = Math.max(center.y - margin, 0);
  else if (center.y > view.top + view.height - margin)
    view.top = Math.min(center.y + margin - view.height,
                        this.level.height - view.height);
};

CanvasDisplay.prototype.drawBackground = function(level) {
  this.cx.fillStyle = "rgb(52, 166, 251)";
  this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

var cloudImg = document.createElement("img");
cloudImg.src = "assets/cloud-small.png";

var guitarImg = document.createElement("img");
guitarImg.src = "assets/guitar-small.jpg"

var waspImg = document.createElement("img");
waspImg.src = "assets/wasp-small.jpg"

var playerImg = document.createElement("img");
playerImg.src = "assets/fadda-small.png";

/* the following part is somewhat repitive, is it possible to shorten that? */

CanvasDisplay.prototype.drawClouds = function() {
    for (var i=0; i<this.level.clouds.length; i++) {
        var cloud = this.level.clouds[i];
        var x = cloud.pos.x - this.viewport.left;
        var y = cloud.pos.y - this.viewport.top;
        this.cx.drawImage(cloudImg, x, y);
    }
};

CanvasDisplay.prototype.drawGuitars = function() {
    for (var i=0; i<this.level.guitars.length; i++) {
        var guitar = this.level.guitars[i];
        var x = guitar.pos.x - this.viewport.left;
        var y = guitar.pos.y - this.viewport.top;
        this.cx.drawImage(guitarImg, x, y);
    }
};

CanvasDisplay.prototype.drawWasps = function() {
    for (var i=0; i<this.level.wasps.length; i++) {
        var wasp = this.level.wasps[i];
        var x = wasp.pos.x - this.viewport.left;
        var y = wasp.pos.y - this.viewport.top;
        this.cx.drawImage(waspImg, x, y);
    }
};

CanvasDisplay.prototype.drawPlayer = function() {
    var x = this.level.player.pos.x - this.viewport.left;
    var y = this.level.player.pos.y - this.viewport.top;
    this.cx.drawImage(playerImg, x, y)
};
