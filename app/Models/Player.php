<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $fillable = ['name', 'score', 'games'];

    protected $casts = [
        'score' => 'integer',
        'games' => 'integer',
    ];
}