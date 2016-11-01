/**
 * Created by aguidet on 31/10/16.
 */

// map setting
var tileSize = 16;
var roomWidth = 20;
var roomHeight = 10;
var col = 4;
var row = 3;

// canvas setting
var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
var initialScale = 1;

context.scale(initialScale, initialScale);
canvas.width = roomWidth * col * tileSize * initialScale;
canvas.height = roomHeight * row * tileSize * initialScale;

// draw grid function
function drawGrid() {

    var maxX = tileSize * roomWidth * col * initialScale;
    var maxY = tileSize * roomHeight * row * initialScale;

    // draw the tiles
    context.beginPath();

    for (var x = 0; x <= maxX; x += tileSize * initialScale) {
        context.moveTo(x, 0);
        context.lineTo(x, maxY);
    }

    for (var y = 0; y <= maxY; y += tileSize * initialScale) {
        context.moveTo(0, y);
        context.lineTo(maxX, y);
    }

    context.strokeStyle = "silver";
    context.stroke();

    // draw th rooms
    context.beginPath();

    for (var x = 0; x <= maxX; x += tileSize * initialScale * roomWidth) {
        context.moveTo(x, 0);
        context.lineTo(x, maxY);
    }

    for (var y = 0; y <= maxY; y += tileSize * initialScale * roomHeight) {
        context.moveTo(0, y);
        context.lineTo(maxX, y);
    }

    context.strokeStyle = "grey";
    context.stroke();
}

drawGrid();

var paint = false;

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect(); // abs. size of element
    var scaleX = canvas.width / rect.width;   // relationship bitmap vs. element for X
    var scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

    return {
        x: parseInt(((e.clientX - rect.left) * scaleX) / (tileSize * initialScale)),// / initialScale,   // scale mouse coordinates after they have
        y: parseInt(((e.clientY - rect.top) * scaleY) / (tileSize * initialScale))// / initialScale     // been adjusted to be relative to element
    }
}


var tiles = new Array();

function drawTiles() {

    drawGrid();

    context.fillStyle = "red";
    context.beginPath();
    for (var i = 0; i < tiles.length; i++) {
        if (tiles[i] !== undefined) {

            var x = i % (roomWidth * col);
            var y = Math.floor(i / (roomWidth * col));
            // console.log(x, y);

            context.fillRect(
                x * tileSize * initialScale,
                y * tileSize * initialScale,
                tileSize * initialScale,
                tileSize * initialScale
            );
        }
    }

    // context.strokeStyle = "red";
    context.stroke();
}

$('canvas').click(function (e) {
    var p = getMousePos(canvas, e);

    var index = p.x + (p.y * roomWidth * col);
    tiles[index] = 1;

    // console.log(index, p);
    drawTiles();
});

/*
$('canvas').mousedown(function (e) {
    var pos = getMousePos(canvas, e);

    paint = true;
    addClick(
        pos.x,
        pos.y
    );
    redraw()
})

$('canvas').mousemove(function (e) {
    if (paint) {

        var pos = getMousePos(canvas, e);

        addClick(
            pos.x,
            pos.y,
            true
        );
        redraw();
    }
})

$('canvas').mouseup(function (e) {
    paint = false;
});

$('canvas').mouseleave(function (e) {
    paint = false;
});


var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);// Clears the canvas

    context.strokeStyle = "#df4b26";
    context.lineJoin = "square";
    context.lineWidth = 5;

    for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
}
*/
