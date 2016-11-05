/**
 * Created by aguidet on 1/11/16.
 */

// load the available maps in the list
$.get("/map/list", function (data) {
    mapList = JSON.parse(data);

    mapList.forEach(function (map) {
        $('#map-list').append(
            '<li><a href="?file=' + map + '">' + map + '</a></li>'
        );
    });
});

$('#btn-hide').click(function () {
    showAnnotations = !showAnnotations;
    reinitCanvas();
});

$('#btn-zoom-in').click(function () {
    initialScale *= 1.5;
    reinitCanvas();
});

$('#btn-zoom-out').click(function () {
    initialScale /= 1.5;
    reinitCanvas();
});

$('#btn-font').click(function () {
    brushId = 'annotation';
});

$('#btn-pencil').click(function () {
    brushId = 1;
});

$('#btn-erase').click(function () {
    brushId = undefined;
});

$('#btn-clear').click(function () {
    currentMapData.tiles = [];
    currentMapData.annotations = [];
    reinitCanvas();
});

$('#btn-save').click(function () {
    $.ajax({
        url: '/map/save/' + currentMap,
        type: 'post',
        dataType: 'json',
        success: function (data) {
            // $('#target').html(data.msg);
        },
        data: {'map': JSON.stringify(currentMapData)}
    });
});

$('#btn-delete').click(function () {
    $.ajax({
        url: '/map/delete/' + currentMap,
        type: 'post',
        dataType: 'json',
        success: function (data) {
            // $('#target').html(data.msg);
            location.reload(true);
        },
        data: {'map': JSON.stringify(currentMapData)}
    });
});

$('#btn-load').click(function () {
    $.get("/map/load", function (data) {
        currentMapData = JSON.parse(data);
        reinitCanvas();
    });
});
