<?php

namespace App\Http\Controllers;

use App\Models\Player;

class LeaderboardController extends Controller
{
    public function index()
    {
        return response()->json(
            Player::query()
                ->orderByDesc('score')
                ->orderBy('games')
                ->orderBy('id')
                ->get(['id', 'name', 'score', 'games'])
        );
    }
}