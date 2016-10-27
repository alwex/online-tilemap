/**
 * Created by aguidet on 27/10/16.
 */

var isClicked = false

$('td').hover(function (e) {
    if (isClicked) {
        $(this).addClass('grey')
    }
})

$('body').mousedown(function (e) {
    isClicked = true
})

$('body').mouseup(function (e) {
    isClicked = false
})

