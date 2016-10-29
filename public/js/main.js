/**
 * Created by aguidet on 27/10/16.
 */

// editMode available are
// pencil, erase, annotate
var editMode = ''
var isCLicked = false

// listen buttons
$('#panel-tools button').click(function (e) {
    $('#panel-tools button').removeClass('active')
    $(this).addClass('active')
    editMode = $(this).attr('id')
})

// action
$('td').hover(function (e) {
    if (isCLicked) {
        switch (editMode) {
            case 'btn-pencil':
                $(this).addClass('grey')
                break
            case 'btn-erase':
                $(this).removeClass('grey')
                break
        }
    }
})

$('td').click(function (e) {
    if (editMode === 'btn-font') {
        $(this).popover({
            container: 'body',
            //html: true,
            content: 'je suis un commentaire sur cette cellule',
            placement: 'top'
        })
        $(this).popover('show')
    }
})

$('#btn-hide').click(function (e) {

    if ($(this).hasClass('active')) {

        $('td').popover('hide')
        $(this).removeClass('active')
    } else {

        $('td').popover('show')
        $(this).addClass('active')
    }

    e.stopPropagation()
})

$('body').mousedown(function (e) {
    isCLicked = true
})

$('body').mouseup(function (e) {
    isCLicked = false
})
