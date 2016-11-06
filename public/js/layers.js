/**
 * Created by aguidet on 6/11/16.
 */
showLayers = function () {
    $('#layers ul li').remove();
    var layers = currentMapData.tiles;
    for (var i = 0; i < layers.length; i++) {
        console.log('add layer ', i);
        $('#layers ul').append(
            '<li class="layer-selector" id="layer-' + i + '" data-id="' + i + '">' +
            '<span class="glyphicon glyphicon-eye-open"></span>&nbsp;&nbsp;' + layers[i].name + '</li>'
        );
    }
}


function bindLayerSelectors() {
    $('.layer-selector').click(function () {
        currentLayerIndex = parseInt($(this).attr('data-id'));
        $('.layer-selector').removeClass('selected');
        $(this).addClass('selected');
    });

    $('.layer-selector .glyphicon').click(function () {
        if ($(this).hasClass('glyphicon-eye-open')) {
            $(this).addClass('glyphicon-eye-close');
            $(this).removeClass('glyphicon-eye-open');
            var layerIndex = parseInt($(this).parent().attr('data-id'));
            displayLayer[layerIndex] = false;
        } else {
            $(this).addClass('glyphicon-eye-open');
            $(this).removeClass('glyphicon-eye-close');
            var layerIndex = parseInt($(this).parent().attr('data-id'));
            displayLayer[layerIndex] = true;
        }

        reinitCanvas();
    });
}

$(function () {

    showLayers();
    bindLayerSelectors();

    $('#btn-add-layer').click(function (e) {
        var maxLayer = currentMapData.tiles.length;
        currentMapData.tiles[maxLayer] = {
            name: 'layer ' + maxLayer,
            tiles: []
        };

        showLayers();
        bindLayerSelectors();

        $('#layer-' + currentLayerIndex).first().click();
    });

    $('#layer-' + currentLayerIndex).click();
});