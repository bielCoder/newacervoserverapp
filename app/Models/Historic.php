<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Historic extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id","product_id","withdraw","devolution","days"
    ];

    public function users()
    {
        return $this -> belongsToMany(User::class,'users');
    }

    public function products()
    {
        return $this -> belongsToMany(Product::class,'products');
    }
}
