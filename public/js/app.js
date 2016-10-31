/**
 * Created by aguidet on 31/10/16.
 */

var canvas = document.getElementById('canvas')
var context = canvas.getContext("2d")

var initialScale = 2
context.scale(initialScale, initialScale)


var paint = false;

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect() // abs. size of element
    var scaleX = canvas.width / rect.width    // relationship bitmap vs. element for X
    var scaleY = canvas.height / rect.height  // relationship bitmap vs. element for Y

    return {
        x: ((e.clientX - rect.left) * scaleX) / initialScale,   // scale mouse coordinates after they have
        y: ((e.clientY - rect.top) * scaleY) / initialScale     // been adjusted to be relative to element
    }
}


$('canvas').mousedown(function (e) {
    var pos = getMousePos(canvas, e)

    paint = true;
    addClick(
        pos.x,
        pos.y
    )
    redraw()
})

$('canvas').mousemove(function (e) {
    if (paint) {

        var pos = getMousePos(canvas, e)

        addClick(
            pos.x,
            pos.y,
            true
        )
        redraw()
    }
})

$('canvas').mouseup(function (e) {
    paint = false
})

$('canvas').mouseleave(function (e) {
    paint = false
})


var clickX = new Array()
var clickY = new Array()
var clickDrag = new Array()
var paint

function addClick(x, y, dragging) {
    clickX.push(x)
    clickY.push(y)
    clickDrag.push(dragging)
}

function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height) // Clears the canvas

    context.strokeStyle = "#df4b26"
    context.lineJoin = "square"
    context.lineWidth = 5

    for (var i = 0; i < clickX.length; i++) {
        context.beginPath()
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1])
        } else {
            context.moveTo(clickX[i] - 1, clickY[i])
        }
        context.lineTo(clickX[i], clickY[i])
        context.closePath()
        context.stroke()
    }
}

var bw = 300
var bh = 200;

function drawBoard(){

    for (var x = 0; x <= bw; x += 16) {
        context.moveTo(10 + x, 0)
        context.lineTo(10 + x, bh)
    }


    for (var x = 0; x <= bh; x += 16) {
        context.moveTo(0, 10 + x)
        context.lineTo(bw, 10 + x)
    }

    context.strokeStyle = "black"
    context.stroke()
}

drawBoard();