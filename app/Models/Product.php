<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
       "product","code","brand","color",
        "size","sexo","observation",
        "breakdown","description","pending","amount","available","unavailable","days"
    ];

    public function users()
    {
        return $this -> belongsToMany(User::class,'baggage');
    }


}
