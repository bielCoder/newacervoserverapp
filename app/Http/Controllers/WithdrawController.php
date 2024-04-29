<?php

namespace App\Http\Controllers;

use App\Classes\Utilities\Response;
use App\Models\Withdraw;
use App\Http\Controllers\Controller;
use App\Models\{Historic, Product, User};
use DateTime;
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
    public function store(Request $request, Withdraw $baggage, Product $products,Historic $historic, User $users)
    {
         for($i = 0; $i < count($request -> withdraw["products"]); $i++) {
             
                $baggage -> create([
                    "user_id" =>  $request -> withdraw["users"]["id"],
                    "product_id" => $request -> withdraw["products"][$i]["id"]         
                ]);

                $productToRegisterHistoric = $products -> where('id',$request -> withdraw["products"][$i]["id"]) -> get();

                $amountCounter = $productToRegisterHistoric[0] -> available - $request -> withdraw["products"][$i]["amount"];

            

                $products -> where('id',$request -> withdraw["products"][$i]["id"]) -> update([
                    "pending" => true,
                    "days" => now(),
                    "available" => $amountCounter,
                    "unavailable" => $productToRegisterHistoric[0] -> unavailable + $request -> withdraw["products"][$i]["amount"]
                ]);

                
           
                $userToRegisterHistoric = $users -> where('id',$request -> withdraw["users"]["id"]) -> first();  
                           

                $historic -> create([
                    "name" => $userToRegisterHistoric -> name,
                    "register" => $userToRegisterHistoric -> register,
                    "function" => $userToRegisterHistoric -> function,
                    "department" => $userToRegisterHistoric -> department,
                    "email" => $userToRegisterHistoric -> email,
                    "product" => $productToRegisterHistoric[0] -> product,
                    "code" => $productToRegisterHistoric[0] -> code,
                    "brand" => $productToRegisterHistoric[0] -> brand,
                    "color" => $productToRegisterHistoric[0] -> color,
                    "size" => $productToRegisterHistoric[0] -> size,
                    "sexo" => $productToRegisterHistoric[0] -> sexo,
                    "observation" => $productToRegisterHistoric[0] -> observation,
                    "breakdown" => $productToRegisterHistoric[0] -> breakdown,
                    "description" => $productToRegisterHistoric[0] -> description,
                    "pending" => $productToRegisterHistoric[0] -> pending,
                    "amount" => $productToRegisterHistoric[0] -> amount,
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
            $user = User::find($id);
            $products -> where('code',$request -> all()[$i]["code"]) -> update([
                "pending" => false
            ]);
            $withdraw -> where('product_id',$request -> all()[$i]["id"]) -> delete();
                    // $dataProductToId = $historic -> where('code','=',$request -> all()[$i]["code"],'AND','register','=',$user -> register) -> whereNull('devolution') -> get();

                    // $nowDate = new DateTime('now');
                    // $dataBank = new DateTime($dataProductToId[0] -> withdraw);
                    // $days = $nowDate -> diff($dataBank);

                    // $historic -> where('code','=',$request -> all()[$i]["code"],'AND','register','=',$user -> register) -> whereNull('devolution') -> update([
                    //     "name" => $user -> name,
                    //         "register" => $user -> register,
                    //         "function" => $user -> function,
                    //         "department" => $user -> department,
                    //         "email" => $user -> email,
                    //         "product" => $dataProductToId[0] -> product,
                    //         "code" => $dataProductToId[0] -> code,
                    //         "brand" =>$dataProductToId[0] -> brand,
                    //         "color" => $dataProductToId[0] -> color,
                    //         "size" => $dataProductToId[0] -> size,
                    //         "sexo" => $dataProductToId[0] -> sexo,
                    //         "observation" => $dataProductToId[0]-> observation,
                    //         "breakdown" => $dataProductToId[0] -> breakdown,
                    //         "description" => $dataProductToId[0] -> description,
                    //         "pending" => false,
                    //         "amount" => 0,
                    //         "withdraw" => $dataProductToId[0] -> withdraw,
                    //         "devolution" => now(),
                    //         "days" => $days -> days
                    // ]);
        }
                try {
                return $this -> response -> format("withdraw","application/json","delete",null,null,"Produtos devolvidos com sucesso!",200);
                } catch(\Exception $e) {
                return $this -> response -> error("withdraw","application/json","delete",$e -> getMessage(), null, null, 500);
                }
        }
      
    }

