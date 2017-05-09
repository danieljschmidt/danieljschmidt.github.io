"use strict";

/*
- understand the canvas
- advanced javascript
- automatic scrolling (tiles?)
*/

/*
Ideen:
- 3 Modi: freier Fall (falls zu schnell: fällt, aber Mudda fängt ihn unten auf / Misthaufen ? :D)
          Fallschirm (verschwindet wenn gelandet)
          Propeller (geht kaputt, wenn man von unten gegen ein Rechteck stößt)
          unterschiedliche Steuerung
          Kombination nicht möglich!
- Storyline: sammelt Gitarren, Plektren usw für Mudda unten am Boden
- zusätzliche Gefahren: ??
- Übergang Weltraum - Himmel - Horizont - Boden mit Mudda, durch Wolken hindurch?
*/

/*
Ideen für Flugsimulator:
Tag - Nacht
Mudda-Modus: Mudda surft auf E-Gitarre, oder: Mudda steht auf Flugzeug mit E-Gitarre und spielt

*/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var width = 40;
var height = 60;
var x = canvas.width/2;
var y = height;
var xStep = 3;
var yStep = 2;
var dx = 0;
var dy = 0;
var rectH = 10;
var rectW = 200;

var rightPressed = false;
var leftPressed = false;
/* var upPressed = false;
var downPressed = false; */

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    } /* else if (e.keyCode == 40) {
        upPressed = true;
    } else if (e.keyCode == 38) {
        downPressed = true;
    } */
}
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    } /* else if (e.keyCode == 40) {
        upPressed = false;
    } else if (e.keyCode == 38) {
        downPressed = false;
    } */
}

var yRectangles = [200, 400, 600, 800];

var rectangles = [];
for (var i = 0; i < 4; i++) {
    if (i % 2 == 0) {
        rectangles[i] = {xLeft: 0, yTop: yRectangles[i] - rectH/2};
    } else {
        rectangles[i] = {xLeft: canvas.width - rectW, yTop: yRectangles[i] - rectH/2};
    }
}

function notOnRectangle() {
    var result = true;
    for (var i = 0; i < 4; i++) {
        var r = rectangles[i];
        if (x > r.xLeft && x < r.xLeft + rectW && y + height/2 > r.yTop && y + height/2 < r.yTop + rectH) {
            result = false;
        }
    }
    return result;
}

var img = new Image();

function init() {
    img.src = 'assets/fadda-small.png';
    requestAnimationFrame(draw);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x - width/2, y - height/2)

    for (var i = 0; i < 4; i++) {
        var r = rectangles[i];
        ctx.beginPath();
        ctx.rect(r.xLeft, r.yTop, rectW, rectH);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
    }

    if (rightPressed && x + xStep < canvas.width - width/2) {
        dx = xStep;
    } else if (leftPressed && x - xStep > width/2) {
        dx = - xStep;
    } else {
        dx = 0;
    }

    if (y + yStep < canvas.height - height/2 && notOnRectangle()) {
        dy = yStep;
    } else {
        dy = 0;
    }

    /* if (upPressed && y + yStep < canvas.height - height/2) {
        dy = yStep;
    } else if (downPressed && y - yStep > height/2) {
        dy = - yStep;
    } else {
        dy = 0;
    } */

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}

init();
