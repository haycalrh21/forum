<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

if (php_sapi_name() === 'cli-server' && is_file($_SERVER['DOCUMENT_ROOT'].DIRECTORY_SEPARATOR.$_SERVER['SCRIPT_NAME'])) {
    return false;
}

$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = '/forum'; // Sesuaikan dengan nama folder proyek Laravel Anda di Vercel

if (strpos($url, $path) === 0) {
    $_SERVER['REQUEST_URI'] = substr($url, strlen($path));
}

define('LARAVEL_START', microtime(true));

if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Kernel::class);

$response = $kernel->handle(
    $request = Request::capture()
)->send();

$kernel->terminate($request, $response);
