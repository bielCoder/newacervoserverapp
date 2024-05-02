<?php

namespace App\Http\Controllers;

use App\Classes\Utilities\Response;
use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRegister;
use App\Http\Requests\ProductUpdate;
use Illuminate\Http\Request;

class ProductController extends Controller
{
   
    private $order = "asc";


    public function __construct(private Product $product, private Response $response){}

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if(!empty($request -> order))
        {
          $this -> order = $request -> order;
        }

        try {
            $perPage = $request -> per_page ?? 20; // Define o valor padrão como 15 caso não seja fornecido um valor
       
            if(!is_null($this -> product -> paginate((int)$request -> per_page)))
            {   
                return $this -> response -> format("products","application\json","get",$this -> product -> orderBy("id",(string) $this -> order) -> paginate((int)$perPage),null,null,200);
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRegister $request)
    {
        try {
            $this -> product -> create($request -> all());
            return $this -> response -> format("products","application\json","post",$request -> all(),null,"Produto registrado com sucesso.",202);
        } catch(\PDOException $e)
        {
            return $this -> response -> error("products","application\json","post",$e -> getMessage(),500);
        }catch(\Exception $e)
        {
        
            return $this -> response -> error("products","application\json","post",$e -> getMessage(),500);
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $find = $this -> product -> find($id);
            if(!is_null($find))
            {
                return $this -> response -> format("products","application\json","get",$find,null,null,200);
            }
                return $this -> response -> error("products","application\json","get","Not Found",404);
        } catch(\PDOException $e)
        {
            return $this -> response -> error("products","application\json","get",$e -> getMessage(),$e -> getCode());
        }catch(\Exception $e)
        {
            return $this -> response -> error("products","application\json","get",$e -> getMessage(),$e -> getCode());
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(ProductUpdate $request,$id)
    {
        try {
            $find = $this -> product -> find($id);
            if(!is_null($find))
            {
                $find -> update([
                    "product" => $request -> product,
                    "code" => $find -> code,
                    "brand" => $request -> brand,
                    "color" => $request -> color,
                    "size" => $request -> size,
                    "sexo" => $request -> sexo,
                    "observation" => $request -> observation,
                    "breakdown" => $request -> breakdown,
                    "description" => $request -> description,
                    "pending" => $find -> pending
                ]);
                return $this -> response -> format("products","application\json","put",$find,null,"produto atualizado com sucesso.",202);
            }
                return $this -> response -> error("products","application\json","put","Not Found",404);
        } catch(\PDOException $e)
        {
            return $this -> response -> error("products","application\json","put",$e -> getMessage(),$e -> getCode());
        }catch(\Exception $e)
        {
            return $this -> response -> error("products","application\json","put",$e -> getMessage(),$e -> getCode());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $find = $this -> product -> find($id);
            if(!is_null($find))
            {
                $find -> delete();
                return $this -> response -> format("products","application\json","put",null,null,"produto removido com sucesso.",202);
            }
                return $this -> response -> error("products","application\json","put","Not Found",404);
        } catch(\PDOException $e)
        {
            return $this -> response -> error("products","application\json","put",$e -> getMessage(),$e -> getCode());
        }catch(\Exception $e)
        {
            return $this -> response -> error("products","application\json","put",$e -> getMessage(),$e -> getCode());
        }
    }

    public function search()
    {
        try {
            return $this -> response -> format(
                 "products","application\json","get",
                 $this -> product -> all(),
                 null,null,200
             );
         } catch (\PDOException $e)
         {
             return $this -> response -> error("users","application/json","get",$e -> getMessage(),$e -> getCode());
         } catch (\Exception $e)
         {
             return $this -> response -> error("users","application/json","get",$e -> getMessage(),$e -> getCode());
         }
       
    }

    public function pendingProducts(Request $request)
    {
        if(!empty($request -> order))
        {
          $this -> order = $request -> order;
        }

        try {
            $perPage = $request -> per_page ?? 20; // Define o valor padrão como 15 caso não seja fornecido um valor
            if(!is_null($this -> product -> paginate((int)$perPage)))
            {   
                return $this -> response -> format("products","application\json","get",$this -> product -> where('pending',true) -> orderBy("id",(string) $this -> order) -> paginate((int)$perPage),null,null,200);
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


    public function whoIsUseProduct($id)
    {
        $product = $this -> product -> find($id);
        try {
        $userFind = $product -> users() -> first();
          
            if(!is_null($userFind))
            {
                return $this -> response -> format("users","application\json","get",$userFind,null,null,200);
            }
                return $this -> response -> error("users","application\json","get","Not Found",404);
        } catch(\PDOException $e)
        {
            return $this -> response -> error("users","application\json","get",$e -> getMessage(),$e -> getCode());
        }catch(\Exception $e)
        {
            return $this -> response -> error("users","application\json","get",$e -> getMessage(),$e -> getCode());
        }
    }
}
