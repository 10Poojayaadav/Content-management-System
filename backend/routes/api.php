<?php

use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\productController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/posts-list', [PostController::class, 'list']);

Route::middleware('auth:api')->group(function () {
    // User routes
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/dashboard', [AuthController::class, 'stats']);
    
    Route::apiResource('posts', PostController::class);
    Route::patch('posts/{post}/publish', [PostController::class, 'publish']);

    // Pages
    Route::apiResource('pages', PageController::class);

    // Media
    Route::post('media/upload', [MediaController::class, 'upload']);
});
