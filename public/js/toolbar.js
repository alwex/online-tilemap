/**
 * Created by aguidet on 1/11/16.
 */
$('#btn-zoom-in').click(function() { initialScale *= 1.5; reinitCanvas(); });
$('#btn-zoom-out').click(function() { initialScale /= 1.5; reinitCanvas(); });

$('#btn-pencil').click(function() { brushId = 1 });
$('#btn-erase').click(function() { brushId = undefined });