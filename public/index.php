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
    'monolog.logfile' => __DIR__.'/../app.log',
));

/**
 * save the map
 */
$app->post('/map/save/{file}', function (Application $app, Request $request, $file) {
    file_put_contents('./maps/'.$file.'.json', $request->get('map'));

    return new Response('map saved');
});

/**
 * load a map
 */
$app->get('/map/load/{file}', function ($file) {
    $map = file_get_contents('./maps/'.$file.'.json');

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