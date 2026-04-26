<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\Admin\OfferController as AdminOfferController;
use App\Http\Controllers\HeroImageController;
use App\Http\Controllers\Admin\HeroImageController as AdminHeroImageController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/hero-images', [HeroImageController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::get('/offers', [OfferController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{cartItem}', [CartController::class, 'update']);
    Route::delete('/cart/{cartItem}', [CartController::class, 'destroy']);
    Route::delete('/cart', [CartController::class, 'clear']);

    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
});

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/test', function () {
        return response()->json([
            'message' => 'Welcome admin',
        ]);
    });

    Route::get('/categories', [AdminCategoryController::class, 'index']);
    Route::post('/categories', [AdminCategoryController::class, 'store']);
    Route::put('/categories/{category}', [AdminCategoryController::class, 'update']);
    Route::delete('/categories/{category}', [AdminCategoryController::class, 'destroy']);

    Route::get('/products', [AdminProductController::class, 'index']);
    Route::post('/products', [AdminProductController::class, 'store']);
    Route::put('/products/{product}', [AdminProductController::class, 'update']);
    Route::delete('/products/{product}', [AdminProductController::class, 'destroy']);

    Route::get('/orders', [AdminOrderController::class, 'index']);
    Route::put('/orders/{order}', [AdminOrderController::class, 'update']);

    Route::get('/users', [AdminUserController::class, 'index']);
    Route::put('/users/{user}/toggle-admin', [AdminUserController::class, 'toggleAdmin']);
    Route::delete('/users/{user}', [AdminUserController::class, 'destroy']);

    Route::get('/offers', [AdminOfferController::class, 'index']);
    Route::post('/offers', [AdminOfferController::class, 'store']);
    Route::post('/offers/{offer}', [AdminOfferController::class, 'update']);
    Route::delete('/offers/{offer}', [AdminOfferController::class, 'destroy']);

    Route::get('/hero-images', [AdminHeroImageController::class, 'index']);
    Route::post('/hero-images', [AdminHeroImageController::class, 'store']);
    Route::put('/hero-images/{heroImage}', [AdminHeroImageController::class, 'update']);
    Route::delete('/hero-images/{heroImage}', [AdminHeroImageController::class, 'destroy']);
});