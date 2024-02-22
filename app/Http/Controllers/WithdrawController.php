<?php

namespace App\Http\Controllers;

use App\Classes\Utilities\Response;
use App\Models\Withdraw;
use App\Http\Controllers\Controller;
use App\Models\{Historic, Product, User};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class WithdrawController extends Controller
{


    private $productsInUse;
   

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function __construct(private Response $response) {}

    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Withdraw $baggage, Product $products,Historic $historic)
    {

         for($i = 0; $i < count($request -> withdraw["products"]); $i++) {
                $baggage -> create([
                "user_id" =>  $request -> withdraw["users"]["id"],
                "product_id" => $request -> withdraw["products"][$i]["id"]         
                ]);

                $products -> where('id',$request -> withdraw["products"][$i]["id"]) -> update([
                    "pending" => true
                ]);

                $historic -> create([
                    "user_id" => $request -> withdraw["users"]["id"],
                    "product_id" => $request -> withdraw["products"][$i]["id"],
                    "withdraw" => now(),
                    "devolution" => null,
                    "days" => 0
                ]);
         }
            return $this -> response -> format("withdraw","application/json","post",null,null,"Retirada efetuada com sucesso",202);
    
    }
    
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Withdraw  $withdraw
     * @return \Illuminate\Http\Response
     */
    public function show(Withdraw $withdraw, $id,User $users)
    {
        $user = $users -> where('id',$id) -> first();
        if($user !== null)
        {
            $counter = count($user -> products() -> get());

            for($i = 0; $i < $counter; $i++)
            {
                if($user !== null)
                {
                    $this -> productsInUse =  $user -> products() -> where('user_id',$id) -> get();
                }
                try {
                    return $this -> response -> format("withdraw","application/json","get",$this -> productsInUse,null,null,200);
                } catch(\Exception $e) {
                    return $this -> response -> error("withdraw","application/json","get",$e -> getMessage(), null, null, 500);
                }
         
            }
        } else {
            return $this -> response -> error("withdraw","application/json","get",null,null, 'usuário não encontrado', 404);
        }
       
       
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Withdraw  $withdraw
     * @return \Illuminate\Http\Response
     */
    public function edit(Withdraw $withdraw)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Withdraw  $withdraw
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Withdraw $withdraw)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Withdraw  $withdraw
     * @return \Illuminate\Http\Response
     */
    public function destroy(Withdraw $withdraw,Request $request, Product $products, Historic $historic,$id)
    {
        for($i = 0; $i < count($request -> all()); $i++) {
            $withdraw -> where('product_id',$request -> all()[$i]["id"]) -> delete();
            $dataProductToId = $historic -> where('product_id','=',$request -> all()[$i]["id"],'AND','user_id','=',$id) -> whereNull('devolution') -> get();
          
            $dateDiff = now() -> diff($dataProductToId[0] -> withdraw);
              
            $historic -> where('product_id',$request -> all()[$i]["id"]) -> update([
                "devolution" => now(),
                "days" => $dateDiff -> days,
            ]);

            $products -> where('id',$request -> all()[$i]["id"]) -> update([
                "pending" => false
            ]);
        }


        return $this -> response -> format("withdraw","application/json","delete",null,null,"Produto removido com sucesso.",200);

       
    }
}
