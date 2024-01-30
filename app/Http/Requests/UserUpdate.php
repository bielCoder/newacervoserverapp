<?php

namespace App\Http\Requests;

use App\Rules\FullName;
use Illuminate\Foundation\Http\FormRequest;

class UserUpdate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required','string', new FullName],
            'register' => ['required','lowercase','string'],
            'function' => ['required'],
            'department' => ['required'],
            'email' => ['required','email'],
            'access' => ['required','numeric'],
            // 'password' => ['required']
        ];
    }

    /*
     * 
     *  Get the messages validation 
     *
     */ 

     public function messages()
     {
        return [
            'required' => '* campo obrigatório.',
            'string' => '* campo aceita apenas caracteres.',
            'unique' => '* usuário já existente.',
            'lowercase' => '* campo aceita apenas caracteres minúsculos.',
            'email' => '* campo aceita apenas e-mail.',
            'numeric' => '* campo aceita apenas números.',
        ];
     }
}
