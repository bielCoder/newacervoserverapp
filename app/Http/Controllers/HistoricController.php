<?php

namespace App\Http\Controllers;

use App\Classes\Utilities\Response;
use App\Exports\AllHistorics;
use App\Exports\historicToUser;
use App\Models\{Historic,User,Product};

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class HistoricController extends Controller
{


    private $historics;
    private $response;
    private $order = "asc";

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct(Historic $historics, Response $response)
    {
        $this -> historics = $historics;
        $this -> response = $response;
    }


    public function index(Request $request)
    {
        if(!empty($request -> order))
        {
          $this -> order = $request -> order;
        }
        try {
            $perPage = $request -> per_page ?? 20; // Define o valor padrão como 15 caso não seja fornecido um valor
       
            if(!is_null($this -> historics -> paginate((int)$perPage)))
            {   
                return $this -> response -> format("historics","application\json","get",$this -> historics -> orderBy('id',$this -> order) -> paginate((int)$perPage),null,null,200);
            }
                return $this -> response -> error("historics","application\json","get","Not Found",404);
        } catch(\PDOException $e)
        {
            return $this -> response -> error("historics","application\json","get",$e -> getMessage(),$e -> getCode());
        } catch(\Exception $e)
        {
            return $this -> response -> error("historics","application\json","get",$e -> getMessage(),$e -> getCode());
        }
    }



    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Historic  $historic
     * @return \Illuminate\Http\Response
     */
    public function show(Historic $historic, Request $request, $user)
    {
        try {
       
            if(!is_null($this -> historics -> paginate((int)$request -> per_page)))
            {   
                return $this -> response -> format("historics","application\json","get",$this -> historics -> where("register",$user) -> paginate((int)$request -> per_page),null,null,200);
            }
                return $this -> response -> error("historics","application\json","get","Not Found",404);
        } catch(\PDOException $e)
        {
            return $this -> response -> error("historics","application\json","get",$e -> getMessage(),$e -> getCode());
        } catch(\Exception $e)
        {
            return $this -> response -> error("historics","application\json","get",$e -> getMessage(),$e -> getCode());
        }
    }

 
    public function allExports()
    {
        return Excel::download(new AllHistorics,'historic.xlsx');
    }


    public function findExports($user)
    {
        return Excel::download(new historicToUser($user),'historicToUser.xlsx');
    }

    public function search()
    {
        try {
       
            if(!is_null($this -> historics -> all()))
            {   
                return $this -> response -> format("historics","application\json","get",$this -> historics -> all(),null,null,200);
            }
                return $this -> response -> error("historics","application\json","get","Not Found",404);
        } catch(\PDOException $e)
        {
            return $this -> response -> error("historics","application\json","get",$e -> getMessage(),$e -> getCode());
        } catch(\Exception $e)
        {
            return $this -> response -> error("historics","application\json","get",$e -> getMessage(),$e -> getCode());
        }
    }

  
}
