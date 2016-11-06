/**
 * Created by aguidet on 31/10/16.
 */

// GLOBALS
var brushId = undefined;
var currentLayerIndex = 0;
var displayLayer = [];
var currentMap = getUrlParameter('file') || 'generic';

// actual structure for map
// then layers later
var currentMapData = {
    name: 'generic',
    tileSize: 16,
    roomWidth: 20,
    roomHeight: 12,
    col: 4,
    row: 10,
    tiles: [
        {name: 'layer 1', tiles: []}
    ],
    annotations: []
};

var tileImage = document.getElementById('tile-1');

// canvas setting
var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
var initialScale = 1;
var showAnnotations = true;


canvas.addEventListener('mousedown', mousedown, false);
canvas.addEventListener('mouseup', mouseup, false);
canvas.addEventListener('mousemove', paint, false);
canvas.addEventListener('mousedown', paint, false);

function reinitCanvas() {

    var tileSize = currentMapData.tileSize;
    var roomWidth = currentMapData.roomWidth;
    var roomHeight = currentMapData.roomHeight;
    var col = currentMapData.col;
    var row = currentMapData.row;

    context.scale(initialScale, initialScale);
    canvas.width = roomWidth * col * tileSize * initialScale;
    canvas.height = roomHeight * row * tileSize * initialScale;
    draw();

    $('#overlay').hide();
}

// draw grid function
function drawGrid() {

    var tileSize = currentMapData.tileSize;
    var roomWidth = currentMapData.roomWidth;
    var roomHeight = currentMapData.roomHeight;
    var col = currentMapData.col;
    var row = currentMapData.row;

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
}

// draw grid function
function drawRooms() {

    var tileSize = currentMapData.tileSize;
    var roomWidth = currentMapData.roomWidth;
    var roomHeight = currentMapData.roomHeight;
    var col = currentMapData.col;
    var row = currentMapData.row;

    var maxX = tileSize * roomWidth * col * initialScale;
    var maxY = tileSize * roomHeight * row * initialScale;

    // draw th rooms
    context.beginPath();
    context.setLineDash([
        tileSize / 3 * initialScale,
        tileSize / 3 * initialScale
    ]);

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
    context.setLineDash([0, 0]);
}

function getMousePos(canvas, e) {

    var tileSize = currentMapData.tileSize;
    var roomWidth = currentMapData.roomWidth;
    var roomHeight = currentMapData.roomHeight;
    var col = currentMapData.col;
    var row = currentMapData.row;

    var rect = canvas.getBoundingClientRect();
    var scaleX = canvas.width / rect.width;
    var scaleY = canvas.height / rect.height;

    return {
        x: parseInt(((e.clientX - rect.left) * scaleX) / (tileSize * initialScale)),
        y: parseInt(((e.clientY - rect.top) * scaleY) / (tileSize * initialScale))
    }
}

function draw(mouseIndex) {

    var tileSize = currentMapData.tileSize;
    var roomWidth = currentMapData.roomWidth;
    var roomHeight = currentMapData.roomHeight;
    var col = currentMapData.col;
    var row = currentMapData.row;

    // clear before redraw
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid();

    var layers = currentMapData.tiles;
    for (var theLayerIndex = 0; theLayerIndex < layers.length; theLayerIndex++) {

        if (displayLayer[theLayerIndex] !== false) {
            var tiles = layers[theLayerIndex].tiles || [];

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
                    );
                }
            }
        }

    }

    if (showAnnotations) {
        var annotations = currentMapData.annotations || [];
        for (var i = 0; i < annotations.length; i++) {
            if (annotations[i] !== undefined && annotations[i] !== null) {

                var x = i % (roomWidth * col);
                var y = Math.floor(i / (roomWidth * col));

                context.beginPath();
                // context.fillStyle = 'yellow';
                context.rect(
                    x * tileSize * initialScale,
                    y * tileSize * initialScale,
                    tileSize * initialScale,
                    tileSize * initialScale
                );

                context.strokeStyle = 'orange';
                context.stroke();

                var fontSize = 14 * initialScale;

                context.beginPath();
                context.fillStyle = "black";
                context.font = "normal " + fontSize + "px Arial";

                var lines = annotations[i].split('\n');
                for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                    context.fillText(
                        lines[lineIndex],
                        x * tileSize * initialScale,
                        y * tileSize * initialScale + (lineIndex * initialScale * tileSize) - (tileSize / 5 * initialScale)
                    );
                }

                context.stroke();
            }
        }
    }

    x = mouseIndex % (roomWidth * col);
    y = Math.floor(mouseIndex / (roomWidth * col));

    context.beginPath();
    context.rect(
        x * tileSize * initialScale,
        y * tileSize * initialScale,
        tileSize * initialScale,
        tileSize * initialScale
    );

    context.strokeStyle = 'black';
    context.stroke();

    drawRooms();
}

var mouseLeftButtonDown = false;
function mousedown(e) {
    switch (e.which) {
        case 1:
            // left mouse
            mouseLeftButtonDown = true;
            break;
        case 2:
            // middle mouse
            break;
        case 3:
            // right mouse
            break;
        default:
        // not possible
    }
}

function mouseup(e) {
    switch (e.which) {
        case 1:
            // left mouse
            mouseLeftButtonDown = false;
            break;
        case 2:
            // middle mouse
            break;
        case 3:
            // right mouse
            break;
        default:
        // not possible
    }
}

// select the tile at the current position
$(document).on("contextmenu", "canvas", function (e) {
    var roomWidth = currentMapData.roomWidth;
    var col = currentMapData.col;
    var p = getMousePos(canvas, e);
    var index = p.x + (p.y * roomWidth * col);

    if (currentMapData.tiles[currentLayerIndex].tiles[index] !== undefined &&
        currentMapData.tiles[currentLayerIndex].tiles[index] !== null) {
        $('#btn-pencil').click();
        var id = currentMapData.tiles[currentLayerIndex].tiles[index];
        $('#tile-' + id).click();
    } else {
        $('#btn-erase').click();
    }
    return false;
});

function paint(e) {

    var roomWidth = currentMapData.roomWidth;
    var col = currentMapData.col;
    var p = getMousePos(canvas, e);
    var index = p.x + (p.y * roomWidth * col);

    if (mouseLeftButtonDown) {
        if (brushId === 'annotation') {
            currentMapData.annotations[index] = $('#annotation-text').val();
        } else if (brushId === undefined) {
            currentMapData.tiles[currentLayerIndex].tiles[index] = brushId;
            currentMapData.annotations[index] = brushId;
        } else {
            currentMapData.tiles[currentLayerIndex].tiles[index] = brushId;
        }
    }
    draw(index);
}

// init the map list
$.get("/map/load/" + currentMap, function (data) {
    if (parseInt(data) !== 0) {

        // retrocompatibility with old maps
        if (data.tiles[0] === null || data.tiles[0].name === undefined) {
            var oldMap = data.tiles;
            data.tiles = [{
                name: 'layer 1',
                tiles: oldMap
            }];
        }

        currentMapData = data;
    }
}).done(function () {
    reloadProperties();
});
