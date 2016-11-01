/**
 * Created by aguidet on 1/11/16.
 */
$('#tileset img').click(function () {
    $('#tileset img').removeClass('selected');
    $(this).addClass('selected');
    brushId = parseInt($(this).attr('data-tile-id'));
});