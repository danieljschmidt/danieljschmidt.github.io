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
  this.drawNumbers();
  this.drawGuitars();
  this.drawWasps();
  this.drawMudda()
  this.drawPlayer();
};

CanvasDisplay.prototype.updateViewport = function() {
  var view = this.viewport;
   var margin1 = 0.3*view.height;
  var margin2 = 0.5*view.height;
  var player = this.level.player;
  var center = player.pos.plus(player.size.times(0.5));

  /*if (center.x < view.left + margin)
    view.left = Math.max(center.x - margin, 0);
  else if (center.x > view.left + view.width - margin)
    view.left = Math.min(center.x + margin - view.width,
                         this.level.width - view.width);*/
  if (center.y < view.top + margin1)
    view.top = Math.max(center.y - margin1, 0);
  else if (center.y > view.top + view.height - margin2)
    view.top = Math.min(center.y + margin2 - view.height,
                        this.level.height - view.height);
};

CanvasDisplay.prototype.drawBackground = function(level) {
  this.cx.fillStyle = "rgb(230, 242, 255)";
  this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

CanvasDisplay.prototype.drawNumbers = function() {
    this.cx.fillStyle = "rgb(0, 0, 0)";
    this.cx.font = "20px Arial";
    var no2 = this.level.nGuitars;
    var no1 = no2 - this.level.guitars.length;
    this.cx.fillText(no1 + " / " + no2, 10, 30);
    this.cx.fillText("Level " + this.level.number, 500, 30);
}

var cloudImg = document.createElement("img");
cloudImg.src = "assets/Seifenblasen.png";

var guitarImg = document.createElement("img");
guitarImg.src = "assets/Schaufensterpuppenarm.png"

var waspImg = document.createElement("img");
waspImg.src = "assets/Spinne.png"

var muddaImg = document.createElement("img");
muddaImg.src = "assets/Schreiter.png"

var playerNormalImg = document.createElement("img");
playerNormalImg.src = "assets/Hoppe.png";

var playerParachuteImg = document.createElement("img");
playerParachuteImg.src = "assets/Hoppe_Fallschirm.png";

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

CanvasDisplay.prototype.drawMudda = function() {
    var x = this.level.mudda.pos.x - this.viewport.left;
    var y = this.level.mudda.pos.y - this.viewport.top;
    this.cx.drawImage(muddaImg, x, y);
}

CanvasDisplay.prototype.drawPlayer = function() {
    var x = this.level.player.pos.x - this.viewport.left;
    var y = this.level.player.pos.y - this.viewport.top;
    var movementtype = this.level.player.movementType;
    var playerImg = (movementtype=="normal") ? playerNormalImg : playerParachuteImg;
    this.cx.drawImage(playerImg, x, y);
};
