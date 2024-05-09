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
           

               $baggage -> create([
                    "user_id" =>  $request -> withdraw["users"]["id"],
                    "product_id" => $request -> withdraw["products"][$i]["id"],
                    "amount" => $request -> withdraw["products"][$i]["amount"],
                   
                ]);

                 $amount = $baggage -> where('user_id', $request -> withdraw["users"]["id"]) -> get();

 
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
                    "amount" => $amount[$i] -> getOriginal()["amount"],
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
             $amount = $item["amount"] ?? 0;
     
             if ($code !== null) {
                 $user = User::find($id);
                 $product = $products->where('code', $code)->first();
     
                 $counterLess = $product->unavailable - $amount;
                 $counterMore = $product->available + $amount;
     
                
     
                 $inUse = $withdraw->where('product_id', $item["id"])->first();

                
                 $newAmount = $inUse->amount - $amount;

                 $products->where('code', $code)->update([
                    "pending" => $newAmount === 0 ? false : true,
                    "unavailable" => $counterLess,
                    "available" => $counterMore
                ]);
                 $withdraw->where('product_id', $item["id"])->update(["amount" => $newAmount]);
     
                 $dataProductToId = $historic->where('code', '=', $code)
                             ->where('register', '=', $user->register)
                             ->latest('created_at') // Assuming 'created_at' is your timestamp column
                             ->first();
     
                 $nowDate = new DateTime('now');
                 $dataBank = new DateTime($dataProductToId->withdraw);
                 $days = $nowDate->diff($dataBank);
     
                 $findUpdate = $historic->where('code', '=', $code)
                     ->where('register', '=', $user->register)
                     ->whereNull('devolution')
                     ->update([
                         "devolution" => now(),
                         "amount" => $amount,
                         "days" => $days->days
                     ]);
     
                 if ($newAmount === 0) {
                     $withdraw->where('product_id', $item["id"])->delete();
                 }
     
                 if (!$findUpdate) {
                     $historic->create([
                         "name" => $user->name,
                         "register" => $user->register,
                         "active_register" => Auth::user()->register,
                         "active_name" => Auth::user()->name,
                         "function" => $user->function,
                         "department" => $user->department,
                         "email" => $user->email,
                         "product" => $dataProductToId->product,
                         "code" => $dataProductToId->code,
                         "brand" => $dataProductToId->brand,
                         "color" => $dataProductToId->color,
                         "size" => $dataProductToId->size,
                         "sexo" => $dataProductToId->sexo,
                         "observation" => $dataProductToId->observation,
                         "breakdown" => $dataProductToId->breakdown,
                         "description" => $dataProductToId->description,
                         "pending" => $dataProductToId->pending,
                         "amount" => $newAmount === 0 ? 1 : $newAmount,
                         "withdraw" => $dataProductToId->withdraw,
                         "devolution" => now(),
                         "days" => $days->days
                     ]);
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

