<?php

namespace Database\Seeders;

use App\Models\Player;
use Illuminate\Database\Seeder;

class PlayerSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            ['name' => 'امیر', 'score' => 1250, 'games' => 5],
            ['name' => 'محمد', 'score' => 1080, 'games' => 6],
            ['name' => 'زهرا', 'score' => 970, 'games' => 4],
        ] as $player) {
            Player::updateOrCreate(['name' => $player['name']], $player);
        }
    }
}
