<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/




Auth::routes();

// Route::prefix('admin')->namespace('Logged')->middleware('auth')->group(function(){
//     Route::get('/home', 'HomeController@index')->name('home');
//     Route::resource('posts', 'PostController');
// });
// ritorniamo la view home tramite il controller generale
Route::get('/','HomeController@index')->name('home');
Route::resource('/search','SearchController');
Route::resource('/messages','Logged\MessageController');
Route::resource('/host','Logged\HostController');
Route::get('/prova', function () {
    return view('logged.messages');
});
Route::resource('/view','ViewsController');
Route::get('/apartment', function () {
    return view('apartment');
});
Route::get('/test', function () {
    return view('test');
});
Route::get('/search', function () {
    return view('search.search');
});
