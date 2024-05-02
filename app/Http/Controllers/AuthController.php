<?php

namespace App\Http\Controllers;

use App\Classes\Utilities\Response;
use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserRegister;
use App\Models\AccessToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;





class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


   
   
    public function __construct(private User $user, private Response $response){}

    /**
     * 
     *  this function make the register of user
     * 
     */

    

    public function register(UserRegister $request)
    {
        try {
            $this -> user = User::create([
                'name' => $request -> name,
                'register' => $request -> register,
                'function' => $request -> function,
                'department' => $request -> department,
                'email' => $request -> email,
                'access' => $request -> access,
                'password' => bcrypt($request -> password),
              ]);
               return $this -> response -> format("users","application\json","post",
               $this -> user -> getOriginal(),
               null,"Usuário cadastrado com sucesso.",201);
        } catch(\PDOException $e) {
            return $this -> response -> error("users","application\json","post",$e -> getMessage(), $e -> getCode());
        } catch(\Exception $e)
        {
            return $this -> response -> error("users","application\json","post",$e -> getMessage(), $e -> getCode());
        }
       
    }

    public function login(Request $request,User $user, AccessToken $token)
    {
        try {
            $user = User::where('register', $request -> register) -> first();
            if(!is_null($user) && Hash::check($request -> password, $user -> password))
            {
                return $this -> response -> format("users","application\json","post",$user,$user -> createToken($user -> name) -> plainTextToken,$user -> name.' is logged',202);
            } else {
                return $this -> response -> error("users","application\json","post","Credenciais Inválidas.",401);
            }
        } catch(\PDOException $e) {
            return $this -> response -> error("users","application\json","post",$e -> getMessage(),$e -> getCode());
        } catch(\Exception $e) {
            return $this -> response -> error("users","application\json","post",$e -> getMessage(),$e -> getCode());
        }
    }

    public function logout(User $user, Request $request)
    {
        try {
            
            $requestToken = $request -> header('Authorization');
            $personalAccessToken = new PersonalAccessToken();
            $token = $personalAccessToken -> findToken(str_replace('Bearer','',$requestToken));
            if($token !== null)
            {
                $token -> delete();
            } else {
                return $this -> response -> error("users","application\json","post","Token revoked",404);
            }
           

            return $this -> response -> format("users","application\json","post",null,null,"saida realizada com succeso.",202);
            
        } catch(\PDOException $e)
        {
            return $this -> response -> error("users","application\json","post",$e -> getMessage(),$e -> getCode());
        } catch(\Exception $e)
        {
            return $this -> response -> error("users","application\json","post",$e -> getMessage(),$e -> getCode());
        }
    }
}
