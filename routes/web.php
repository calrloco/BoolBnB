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

//Home
Route::get('/','HomeController@index')->name('home');

//Messaggi
Route::resource('/messages', 'Logged\MessageController');
//Non so a che cazzo serve ma senza non funziona
Route::get('/apartments', 'Logged\HostController@index');

//Pagamento
Route::get('/apartments/{id}/sponsor', 'Logged\HostController@sponsor')->name('logged.sponsor');
Route::get('/apartments/{id}/pay/{id_sponsor}/{price}', 'Logged\HostController@pay')->name('logged.pay');
Route::post('apartments/{id}', 'Logged\HostController@checkout')->name('logged.checkout');
//Visibilità annuncio
Route::patch('host/visibility/{id}', 'Logged\HostController@visibility')->name('logged.visibility');

//Ricerca vicino e dalla nav
Route::post('/search','SearchController@store')->name('search');
Route::get('/search/{search}','SearchController@show')->name('cerca');

//Invio Messaggio
Route::post('/send-message', 'SendMessageController@store')->name('send.message');

//Visualisazzioni
Route::post('/view', 'ViewsController@store')->name('visualizza');

//Host Controller Crud
Route::resource('/host','Logged\HostController');



Route::get('/apartment', function () {
    return view('apartment');
});

Route::delete('/images/{image}','Logged\ImageController@destroy')->name('cancella');
