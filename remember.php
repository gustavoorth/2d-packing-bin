<?php

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $file = 'saved.json';
    $data = json_decode(file_get_contents('php://input'), true);
    file_put_contents($file, json_encode($data));
    header('HTTP/1.0 200 OK');
    exit;
} else {
    http_response_code(405);
    header('Allow: PUT');
    exit;
}
