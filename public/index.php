<?php
/**
 * Created by PhpStorm.
 * User: aguidet
 * Date: 1/11/16
 * Time: 11:12 PM
 */

require_once __DIR__.'/../vendor/autoload.php';

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app = new Application();

$app->post('/map/save/{file}', function (Application $app, Request $request, $file) {
    file_put_contents('./maps/'.$file.'.json', $request->get('map'));

    return new Response('map saved');
});

$app->get('/map/load/{file}', function ($file) {
    $map = file_get_contents('./maps/'.$file.'.json');

    return new Response($map);
});

$app->run();