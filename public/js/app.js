/**
 * Created by aguidet on 31/10/16.
 */

var currentMap = getUrlParameter('file') || 'generic';

// map setting
var tileSize = 16;
var roomWidth = 20;
var roomHeight = 10;
var col = 4;
var row = 10;



// actual structure for map
// then layers later
var tiles = new Array();

var tileImage = document.getElementById('tile-1');

// canvas setting
var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
var initialScale = 1;

function reinitCanvas() {
    context.scale(initialScale, initialScale);
    canvas.width = roomWidth * col * tileSize * initialScale;
    canvas.height = roomHeight * row * tileSize * initialScale;
    draw();
}

canvas.addEventListener('mousemove', paint, false);
canvas.addEventListener('mousedown', mousedown, false);
canvas.addEventListener('mouseup', mouseup, false);

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
    context.closePath();
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
    context.closePath();
    context.stroke();
}

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    var scaleX = canvas.width / rect.width;
    var scaleY = canvas.height / rect.height;

    return {
        x: parseInt(((e.clientX - rect.left) * scaleX) / (tileSize * initialScale)),
        y: parseInt(((e.clientY - rect.top) * scaleY) / (tileSize * initialScale))
    }
}

function draw() {
    // clear before redraw
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();

    for (var i = 0; i < tiles.length; i++) {
        if (tiles[i] !== undefined && tiles[i] !== null) {

            tileImage = document.getElementById('tile-' + tiles[i]);
            var x = i % (roomWidth * col);
            var y = Math.floor(i / (roomWidth * col));

            context.drawImage(
                tileImage,
                x * tileSize * initialScale,
                y * tileSize * initialScale,
                tileSize * initialScale,
                tileSize * initialScale
            )
        }
    }
}

var mouseButtonDown = false;
function mousedown(e) {
    mouseButtonDown = true;
}

function mouseup(e) {
    mouseButtonDown = false;
}

var brushId = 1;

function paint(e) {
    if (mouseButtonDown) {
        var p = getMousePos(canvas, e);
        var index = p.x + (p.y * roomWidth * col);
        tiles[index] = brushId;
        draw();
    }
}

reinitCanvas();

$.get("/map/load/" + currentMap, function( data ) {
    tiles = JSON.parse(data);
    reinitCanvas();
});