/**
 * Created by aguidet on 5/11/16.
 */

function reloadProperties() {
    $('#brand').text(currentMap);
    $('#tile-size').val(currentMapData.tileSize);
    $('#room-width').val(currentMapData.roomWidth);
    $('#room-height').val(currentMapData.roomHeight);
    $('#col').val(currentMapData.col);
    $('#row').val(currentMapData.row);
}

$('#tile-size').change(function (e) {
    currentMapData.tileSize = $(this).val();
    reinitCanvas();
});

$('#room-width').change(function (e) {
    currentMapData.roomWidth = $(this).val();
    reinitCanvas();
});

$('#room-height').change(function (e) {
    currentMapData.roomHeight = $(this).val();
    reinitCanvas();
});

$('#col').change(function (e) {
    currentMapData.col = $(this).val();
    reinitCanvas();
});

$('#row').change(function (e) {
    currentMapData.row = $(this).val();
    reinitCanvas();
});
