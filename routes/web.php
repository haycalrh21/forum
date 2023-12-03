<?php

use App\Http\Controllers\CommentarController;
use Inertia\Inertia;
use App\Models\Posting;
use App\Models\Komentar;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostinganController;

// Route::get('/', function () {
//     $postings = Posting::all();

//     return Inertia::render('index', [
//         'postings' => $postings,
//         // 'komentars' => $komentars,
//     ])->withViewData(['route' => 'index']);
// })->name('index');



Route::get('/', function () {
    return Inertia::render('index');
});

Route::get('/coba',[PostinganController::class, 'index'])->name('coba');

Route::get('/koment', function () {
    return Inertia::render('Posts/Comment');
});


Route::get('/posting', function () {
    return Inertia::render('Posts/Posting');
})->name('posting');
    // Rute-rute yang memerlukan otentikasi kustom
    Route::post('/postingan', [PostinganController::class, 'store'])->name('postingan');
    Route::post('/komentar', [CommentarController::class, 'store'])->name('komentar');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


});


Route::middleware(['auth.custom'])->group(function () {



});


require __DIR__.'/auth.php';
