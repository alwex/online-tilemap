<?php
/**
 * Created by PhpStorm.
 * User: aguidet
 * Date: 1/11/16
 * Time: 11:12 PM
 */

require_once __DIR__.'/../vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app = new Silex\Application();

$app->post('/map/save', function (Request $request) {
    file_put_contents('/tmp/map.json', $request->get('map'));

    return new Response('map saved');
});

$app->get('/map/load', function () {
    $map = file_get_contents('/tmp/map.json');
    return new Response($map);
});

$app->run();