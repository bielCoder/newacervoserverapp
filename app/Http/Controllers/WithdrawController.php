<?php

namespace App\Http\Controllers;

use App\Classes\Utilities\Response;
use App\Models\Withdraw;
use App\Http\Controllers\Controller;
use App\Models\{Product, User};
use Illuminate\Http\Request;

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
    public function store(Request $request, Withdraw $baggage, Product $products)
    {

         for($i = 0; $i < count($request -> withdraw["products"]); $i++) {
                $baggage -> create([
                "users" =>  $request -> withdraw["users"]["id"],
                "products" => $request -> withdraw["products"][$i]["id"]         
                ]);
                $products -> where('id',$request -> withdraw["products"][$i]["id"]) -> update([
                    "pending" => true
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
                    return $this -> response -> format("withdraw","application/json","get",$e -> getMessage(), null, null, 500);
                }
         
            }
        } else {
            return $this -> response -> format("withdraw","application/json","get",null,null, 'usuário não encontrado', 404);
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
    public function destroy(Withdraw $withdraw)
    {
        //
    }
}
