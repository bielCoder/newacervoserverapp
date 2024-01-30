<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WithdrawController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



// routes group users

Route::prefix('users') -> group(function () {
    Route::controller(AuthController::class)->group(function() {
        Route::post('login','login') -> name('Auth - Login');
        Route::post('register','register') -> name('Auth - Register');
    });
});



// routes group blocked

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('users') -> group(function () {
        Route::controller(AuthController::class)->group(function() {
            Route::post('logout','logout') -> name('Auth - Logout');
        });

        Route::controller(UserController::class) -> group(function() {
            Route::get('/search','search') -> name('User - Search');
            Route::get('/','index') -> name('User - Index');
            Route::delete('/{id}','destroy') -> name('User - Destroy');
            Route::put('/{id}','update') -> name('User - Update');
            Route::get('/{id}','show') -> name('User - Show');
            Route::put('/reset/{id}','reset') -> name('User - Reset');
        });
    });

    Route::prefix('products') -> group(function(){
        Route::controller(ProductController::class) -> group(function(){
            Route::get('/search','search') -> name('Products - Search');
            Route::post('/create','store') -> name('Products - Store');
            Route::get('/','index') -> name('Products - Index');
            Route::delete('/{id}','destroy') -> name('Products - Destroy');
            Route::put('/{id}','update') -> name('Products - Update');
            Route::get('/{id}','show') -> name('Products - Show');
        });
    });

    Route::prefix('withdraw') -> group(function(){
       Route::controller(WithdrawController::class) -> group(function(){
            Route::get('/{id}','show') -> name('Withdraw - Show');
         Route::post('store','store') -> name('Withdraw - Store');
       });
    });
});