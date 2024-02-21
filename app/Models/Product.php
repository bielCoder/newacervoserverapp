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
        "breakdown","low","description","pending","amount"
    ];

    public function users()
    {
        return $this -> belongsToMany(User::class,'baggage');
    }

    public function historics()
    {
        return $this -> hasMany(Historic::class,'historics');
    }
}
