<?php

namespace App\Exports;

use App\Models\{Historic,User,Product};
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;


class HistoricToUser implements FromView
{
    private $user;

    public function __construct($user)
    {
        $this -> user = $user;
    }

    public function view(): View
    {
              $user = User::where('id',$this -> user) -> first();
              $historics = Historic::where('register',$user -> register) -> get();
              return view('exports.exportToUser',["historics"=>$historics]);
    }
}
