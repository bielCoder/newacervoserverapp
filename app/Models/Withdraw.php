<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Withdraw extends Model
{
    use HasFactory;
    // use SoftDeletes;

    protected $table = 'baggage';

    protected $fillable = [
        "user_id","product_id","amount"
    ];
}
