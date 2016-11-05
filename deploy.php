<?php
/*
 * This file has been generated automatically.
 * Please change the configuration for correct use deploy.
 */

require 'recipe/composer.php';

// Set configurations
set('repository', 'https://github.com/alwex/online-tilemap.git');
set('shared_files', []);
set('shared_dirs', ['./public/maps', './public/images/tiles']);
set('writable_dirs', ['./public/maps', './public/images/tiles']);

// Configure servers
server('production', 'tikotepadventure.com')
    ->user('aguidet')
    ->password()
    ->env('deploy_path', '/var/www/online-tilemap');

after('deploy:update_code', 'deploy:shared');