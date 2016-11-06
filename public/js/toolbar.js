/**
 * Created by aguidet on 1/11/16.
 */

// load the available maps in the list
$.get("/map/list", function (data) {
    mapList = data;

    mapList.forEach(function (map) {
        $('#map-list').append(
            '<li><a href="?file=' + map + '">' + map + '</a></li>'
        );
    });
});

$('#tool-edit .btn').click(function () {
    $('#tool-edit .btn').removeClass('active');
    $(this).addClass('active');
});

$('#btn-hide').click(function () {
    showAnnotations = !showAnnotations;
    reinitCanvas();
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
    } else {
        $(this).addClass('active');
    }
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
    currentMapData.tiles[currentLayerIndex] = [];
    currentMapData.annotations = [];
    reinitCanvas();
});

$('#btn-save').click(function () {
    $('#overlay').show();
    $.ajax({
        url: '/map/save/' + currentMap,
        type: 'post',
        dataType: 'json',
        success: function (data) {
            $('#overlay').hide();
        },
        data: {'map': JSON.stringify(currentMapData)}
    });
});

$('#btn-delete').click(function () {
    if (confirm("Are you sure you want do delete this map?")) {
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
    }
});

$('#btn-load').click(function () {
    $.get("/map/load", function (data) {
        currentMapData = JSON.parse(data);
        reinitCanvas();
    });
});

$('#btn-add-up').click(function () {
    var row = parseInt(currentMapData.row);
    row += 1;
    currentMapData.row = row;
    reinitCanvas();
});

$('#btn-add-down').click(function () {
    var row = parseInt(currentMapData.row);
    row += 1;
    currentMapData.row = row;
    reinitCanvas();
});