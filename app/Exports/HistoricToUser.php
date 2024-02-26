<?php

namespace App\Exports;

use App\Models\{Historic,User,Product};
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\FromCollection;


class HistoricToUser implements FromCollection
{

    private $products;


    public function collection()
    {
              $user = User::where('id',1) -> first();
       return $user -> historics() -> where('user_id',$user -> id) -> get();
    }
}
