<?php

namespace App\Exports;

use App\Models\Historic;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class AllHistorics implements FromView
{
  
    public function view(): View
    {
        return view('exports.exportToUser',["historics"=>Historic::orderBy('id', 'desc')->get()]);
    }

 
}
