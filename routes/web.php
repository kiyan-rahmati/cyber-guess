<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\LeaderboardController;
use Illuminate\Support\Facades\Route;

Route::get('/', [GameController::class, 'index'])->name('game.index');
Route::post('/score', [GameController::class, 'saveScore'])->name('game.score');
Route::get('/leaderboard', [LeaderboardController::class, 'index'])->name('leaderboard');
