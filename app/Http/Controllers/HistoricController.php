<?php

namespace App\Http\Controllers;

use App\Classes\Utilities\Response;
use App\Exports\historicToUser;
use App\Models\{Historic,User,Product};

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class HistoricController extends Controller
{


    private $historics;
    private $response;
    private $products;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct(Historic $historics, Response $response, Product $products)
    {
        $this -> historics = $historics;
        $this -> response = $response;
        $this -> products = $products;
    }


    public function index(Request $request)
    {
        try {
       
            if(!is_null($this -> historics -> paginate((int)$request -> per_page)))
            {   
                return $this -> response -> format("products","application\json","get",$this -> historics -> paginate((int)$request -> per_page),null,null,200);
            }
                return $this -> response -> error("products","application\json","get","Not Found",404);
        } catch(\PDOException $e)
        {
            return $this -> response -> error("products","application\json","get",$e -> getMessage(),$e -> getCode());
        } catch(\Exception $e)
        {
            return $this -> response -> error("products","application\json","get",$e -> getMessage(),$e -> getCode());
        }
    }



    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Historic  $historic
     * @return \Illuminate\Http\Response
     */
    public function show(Historic $historic)
    {
        //
    }

 
    public function allExports()
    {

    }


    public function findExports()
    {
        return Excel::download(new historicToUser,'historicToUser.xlsx');
    }

  
}
