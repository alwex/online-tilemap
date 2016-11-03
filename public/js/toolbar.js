/**
 * Created by aguidet on 1/11/16.
 */
$('#btn-zoom-in').click(function () {
    initialScale *= 1.5;
    reinitCanvas();
});

$('#btn-zoom-out').click(function () {
    initialScale /= 1.5;
    reinitCanvas();
});

$('#btn-pencil').click(function () {
    brushId = 1
});

$('#btn-erase').click(function () {
    brushId = undefined
});

$('#btn-save').click(function () {
    console.log(tiles);
    $.ajax({
        url: '/map/save/' + currentMap,
        type: 'post',
        dataType: 'json',
        success: function (data) {
            // $('#target').html(data.msg);
        },
        data: {'map': JSON.stringify(tiles)}
    });
});

$('#btn-load').click(function () {
    $.get("/map/load", function( data ) {
        tiles = JSON.parse(data);
        reinitCanvas();
    });
});

