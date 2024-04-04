<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Historic extends Model
{
    use HasFactory;

    protected $fillable = [
        "name", "register",	"function",	"department", "email", "product", "code", "brand", "color",	"size", "sexo",	"observation", "breakdown",  "description", "pending", "amount", "withdraw", "devolution", "days" 
    ];

}
