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

$('#btn-load').click(function () {
    $.get("/map/load", function (data) {
        currentMapData = JSON.parse(data);
        reinitCanvas();
    });
});
