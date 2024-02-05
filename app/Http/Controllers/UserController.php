<?php

namespace App\Http\Controllers;

use App\Classes\Utilities\Response;
use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserUpdate;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;


class UserController extends Controller
{
    private $order = "asc";

    public function __construct(private User $user, private Response $response){}

    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     * 
     */


    public function index(Request $request)
    {
       if(!empty($request -> order))
       {
         $this -> order = $request -> order;
       }
        try {
           return $this -> response -> format(
                "users","application\json","get",
                [
                $this -> user -> where('access',1) -> orderBy("id",(string) $this -> order) -> paginate((int)$request -> per_page),
                $this -> user -> where('access',2) -> orderBy("id",(string) $this -> order) -> paginate((int)$request -> per_page),
                $this -> user -> where('access',3) -> orderBy("id",(string) $this -> order) -> paginate((int)$request -> per_page),
                $this -> user -> where('access',4) -> orderBy("id",(string) $this -> order) -> paginate((int)$request -> per_page)
                ],
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


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $find = $this -> user -> where('id',$id) -> orWhere('register',$id) -> get();
            if(!is_null($find))
            {
                return $this -> response -> format(
                    "users","application\json","get",
                    $find,
                    null,null,200
                );
            } else {
                return $this -> response -> error("users","application/json","get","Not Found",404);
            }

        } catch(\PDOException $e)
        {
            return $this -> response -> error("users","application/json","get",$e -> getMessage(),$e -> getCode());

        } catch(\Exception $e)
        {
            return $this -> response -> error("users","application/json","get",$e -> getMessage(),$e -> getCode());

        }
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UserUpdate $request,$id)
    {
      
        try {   
            $find = $this -> user -> find($id);

        

            if(!is_null($find))
            {
                $find -> update([
                    "name" => $request -> name,
                    "register" => $find -> register,
                    "function" => $request -> function,
                    "department" => $request -> department,
                    "email" => $request -> email,
                    "access" => $request -> access,
                    "password" => $find -> password
                ]);
                $find -> save();
                return $this -> response -> format(
                    "users","application\json","put",
                    null,
                    null,"Usuário atualizado com sucesso.",200
                );
            } else {
                return $this -> response -> error("users","application/json","get","Not Found",404);
            }

        } catch(\PDOException $e)
        {
            return $this -> response -> error("users","application/json","get",$e -> getMessage(),$e -> getCode());

        } catch(\Exception $e)
        {
            return $this -> response -> error("users","application/json","get",$e -> getMessage(),$e -> getCode());

        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,$id)
    {
        try {
            $find = $this -> user -> find($id);
           
            if(!is_null($find))
            {
               
                $requestToken = $request -> header('Authorization');
                $personalAccessToken = new PersonalAccessToken();
                $token = $personalAccessToken -> findToken(str_replace('Bearer','',$requestToken));
                $token -> delete();
                $find -> delete();
                return $this -> response -> format(
                    "users","application\json","delete",
                    null,
                    null,"Usuário removido com sucesso.",200
                );
            } else {
                return $this -> response -> error("users","application/json","get","Not Found",404);
            }

        } catch(\PDOException $e)
        {
            return $this -> response -> error("users","application/json","get",$e -> getMessage(),$e -> getCode());

        } catch(\Exception $e)
        {
            return $this -> response -> error("users","application/json","get",$e -> getMessage(),$e -> getCode());

        }
    }

    // control paginate

    public function size(Request $request)
    {
        return response() -> json($request -> all());
    }



    // set search user

    public function search()
    {
        try {
            return $this -> response -> format(
                 "users","application\json","get",
                 $this -> user -> all(),
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

    // set reset password

    public function reset(Request $request, $id)
    {
        try {   
            $find = $this -> user -> find($id);

            if(!is_null($find))
            {
                $find -> update([
                    "password" => bcrypt($request -> password)
                ]);
                $find -> save();
                return $this -> response -> format(
                    "users","application\json","put",
                    null,
                    null,"Senha alterada com sucesso.",200
                );
            } else {
                return $this -> response -> error("users","application/json","get","Not Found",404);
            }

        } catch(\PDOException $e)
        {
            return $this -> response -> error("users","application/json","get",$e -> getMessage(),$e -> getCode());

        } catch(\Exception $e)
        {
            return $this -> response -> error("users","application/json","get",$e -> getMessage(),$e -> getCode());

        }
    }
}
