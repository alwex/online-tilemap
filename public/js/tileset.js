/**
 * Created by aguidet on 1/11/16.
 */

function initTileset() {
// load the available tiles
    $.get("/tiles/list", function (data) {
        var tilesList = data;
        var index = 0;

        tilesList.forEach(function (img) {
            $('#tileset').append(
                '<img id="tile-' + index + '" data-tile-id="' + index + '" src="' + img + '"/>'
            );

            index++;
        });
    }).done(function () {
        // reinitCanvas();
        // pas terrible
        setTimeout(reinitCanvas, 3000);
    });
}

$('#tileset').on('click', 'img', function () {
    $('#tileset img').removeClass('selected');
    $(this).addClass('selected');
    brushId = parseInt($(this).attr('data-tile-id'));
});
