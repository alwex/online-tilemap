<?php
/*
 * This file has been generated automatically.
 * Please change the configuration for correct use deploy.
 */

require __DIR__ . '/deploy.config.php';
require 'recipe/composer.php';

// Set configurations
set('repository', 'https://github.com/alwex/online-tilemap.git');
set('shared_files', []);
set('shared_dirs', ['./public/maps', './public/images/tiles']);
set('writable_dirs', ['./public/maps', './public/images/tiles']);

// Configure servers
server('production', $server)
    ->user($user)
    ->identityFile()
    ->env('deploy_path', '/var/www/online-tilemap')
    ->stage('prod');

after('deploy:update_code', 'deploy:shared');