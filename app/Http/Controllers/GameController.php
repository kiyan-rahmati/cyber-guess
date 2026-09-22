<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index()
    {
        return view('game');
    }

    public function saveScore(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:30'],
            'score' => ['required', 'integer', 'min:0'],
        ]);

        $player = Player::firstOrCreate(
            ['name' => $data['name']],
            ['score' => 0, 'games' => 0]
        );

        $player->increment('score', $data['score']);
        $player->increment('games');

        return response()->json(['success' => true]);
    }
}