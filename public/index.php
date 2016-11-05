<?php
/**
 * User: aguidet
 * Date: 1/11/16
 * Time: 11:12 PM
 */

require_once __DIR__.'/../vendor/autoload.php';

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app = new Application();

$app->register(new Silex\Provider\MonologServiceProvider(), array(
    'monolog.logfile' => '/var/log/online-tilemap/app.log',
));

/**
 * save the map
 */
$app->post('/map/save/{file}', function (Application $app, Request $request, $file) {
    file_put_contents('./maps/'.$file.'.json', $request->get('map'));

    return new Response('map saved');
});

/**
 * delete the map
 */
$app->post('/map/delete/{file}', function (Application $app, Request $request, $file) {
    unlink('./maps/'.$file.'.json');
    return new Response('map deleted');
});

/**
 * load a map
 */
$app->get('/map/load/{file}', function ($file) {
    $filename = './maps/'.$file.'.json';

    $map = json_encode(0);
    if (file_exists($filename)) {
        $map = file_get_contents($filename);
    }

    return new Response($map);
});

/**
 * list available maps
 */
$app->get('/map/list/', function () use ($app) {

    $mapList = glob("./maps/*.json");
    $cleanList = [];
    foreach ($mapList as $map) {
        $clean = str_replace('./maps/', '', $map);
        $clean = str_replace('.json', '', $clean);
        $cleanList[] = $clean;
    }

    $app['monolog']->addInfo('available maps '.var_export($cleanList, true));

    return new Response(json_encode($cleanList));
});

/**
 * get available tiles
 */
$app->get('/tiles/list/', function () use ($app) {

    $tileList = glob("./images/tiles/*");

    $app['monolog']->addInfo('available tiles '.var_export($tileList, true));

    return new Response(json_encode($tileList));
});


$app->run();