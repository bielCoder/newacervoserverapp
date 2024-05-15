<?php

namespace App\Http\Controllers;

use App\Classes\Utilities\Response;
use App\Models\Withdraw;
use App\Http\Controllers\Controller;
use App\Models\{Historic, Product, User};
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
                 $amount = $baggage -> where('user_id', $request -> withdraw["users"]["id"]) -> get();
          
                 if(count($amount) === 0)
                 {
                    $baggage -> create([
                        "user_id" =>  $request -> withdraw["users"]["id"],
                        "product_id" => $request -> withdraw["products"][$i]["id"],
                        "amount" => $request -> withdraw["products"][$i]["amount"],
                       
                    ]);
                 } else {
                    $baggage -> where('user_id', $request -> withdraw["users"]["id"]) -> update([
                        "amount" =>  $amount[$i] -> getOriginal()["amount"] + $request -> withdraw["products"][$i]["amount"]
                    ]);
                 }
                $productToRegisterHistoric = $products -> where('id',$request -> withdraw["products"][$i]["id"]) -> get();
            
                if($productToRegisterHistoric)
                {
                    $amountCounter = $productToRegisterHistoric[0] -> available - $request -> withdraw["products"][$i]["amount"];
                    $products -> where('id',$request -> withdraw["products"][$i]["id"]) -> update([
                        "pending" => true,
                        "days" => now(),
                        "available" => $amountCounter,
                        "unavailable" => $productToRegisterHistoric[0] -> unavailable + $request -> withdraw["products"][$i]["amount"]
                    ]);
                }
              
              
                            $userToRegisterHistoric = $users -> where('id',$request -> withdraw["users"]["id"]) -> first();
                            
                            $historic -> create([
                                "name" => $userToRegisterHistoric -> name,
                                "register" => $userToRegisterHistoric -> register,
                                "active_register" => Auth::user() -> register,
                                "active_name" => Auth::user() -> name,
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
                                "amount" =>  $request -> withdraw["products"][$i]["amount"],
                                "withdraw" => now(),
                                "devolution" => "pendente",
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
            $amount = $withdraw -> where('user_id',$id) -> get();
          
            for($i = 0; $i < $counter; $i++)
            {
                if($user !== null)
                {
                    $this -> productsInUse =  $user -> products() -> where('user_id',$id) -> get();
                }
                try {
                    $ArrayObject = array(["product" => $this -> productsInUse,"amount" => $amount]);

                    return $this -> response -> format("withdraw","application/json","get",$ArrayObject,null,null,200);

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
     * 
     * 
     */

     public function destroy(Withdraw $withdraw, Request $request, Product $products, Historic $historic, $id)
     {
        foreach ($request->all() as $item) {
            $code = $item["code"] ?? null;
            $amountToReturn = $item["amount"] ?? 0;
        
            if ($code !== null && $amountToReturn > 0) {
                $user = User::find($id);
                $product = $products->where('code', $code)->first();
        
                if ($product && $user) {
                    $newUnavailable = $product->unavailable - $amountToReturn;
                    $newAvailable = $product->available + $amountToReturn;
        
                    // Update the product inventory
                    $product->update([
                        "pending" => $newUnavailable > 0,
                        "unavailable" => $newUnavailable,
                        "available" => $newAvailable
                    ]);
        
                    // Process the withdrawal record
                    $withdrawItem = $withdraw->where('product_id', $item["id"])->first();
                    if ($withdrawItem) {
                        $remainingWithdrawAmount = $withdrawItem->amount - $amountToReturn;
        
                        // Update or delete the withdrawal record
                        if ($remainingWithdrawAmount > 0) {
                            $withdrawItem->update(["amount" => $remainingWithdrawAmount]);
                        } else {
                            $withdrawItem->delete();
                        }
        
                       // Process each amount to return
                        while ($amountToReturn > 0) {
                        // Retrieve the earliest 'pendente' historic item
                        $historicItem = $historic->where('code', $code)
                                                ->where('register', $user->register)
                                                ->where('devolution', 'pendente')
                                                ->orderBy('withdraw', 'asc')
                                                ->first();

                        if ($historicItem) {
                            $now = new DateTime('now');
                            $withdrawDate = new DateTime($historicItem->withdraw);
                            $daysDiff = $now->diff($withdrawDate)->days;

                            $historicReturnAmount = min($amountToReturn, $historicItem->amount);

                            // Update the historic item with the amount being returned in this iteration
                            $historicItem->update([
                                "devolution" => now(),
                                "amount" =>  $amountToReturn, // Ajuste aqui
                                "days" => $daysDiff,
                                "pending" =>  $remainingWithdrawAmount,
                                "withdraw" => $withdrawDate
                            ]);

                            if ($remainingWithdrawAmount !== 0) {
                                // Log this return as a new historical entry
                                $historic->create([
                                    "name" => $user->name,
                                    "register" => $user->register,
                                    "active_register" => Auth::user()->register,
                                    "active_name" => Auth::user()->name,
                                    "function" => $user->function,
                                    "department" => $user->department,
                                    "email" => $user->email,
                                    "product" => $historicItem->product,
                                    "code" => $historicItem->code,
                                    "brand" => $historicItem->brand,
                                    "color" => $historicItem->color,
                                    "size" => $historicItem->size,
                                    "sexo" => $historicItem->sexo,
                                    "observation" => $historicItem->observation,
                                    "breakdown" => $historicItem->breakdown,
                                    "description" => $historicItem->description,
                                    "pending" => false,
                                    "amount" =>  $remainingWithdrawAmount, // Ajuste aqui
                                    "withdraw" =>  $withdrawDate,  // Preserve the original withdraw date
                                    "devolution" => 'pendente',
                                    "days" => $daysDiff
                                ]);
                            }

                            $amountToReturn -= $historicReturnAmount;
                        } else {
                            break;
                        }
                    }

                    }
                }
            }
        }
        
        try {
            return $this->response->format("withdraw", "application/json", "delete", null, null, "Produtos devolvidos com sucesso!", 200);
        } catch (\Exception $e) {
            return $this->response->error("withdraw", "application/json", "delete", $e->getMessage(), null, null, 500);
        }
        
     }


   
      
    }

