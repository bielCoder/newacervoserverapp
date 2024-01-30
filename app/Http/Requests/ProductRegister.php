<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRegister extends FormRequest
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
            'product' => ['required','string'],
            'code' => ['required','unique:products,code'],
            'sexo' => ['required','string'],
            'breakdown' => ['required','boolean'],
            'pending' => ['required','boolean']

        ];
    }

    /**
     * 
     * 
     * Get message validation
     * 
     */

     public function messages()
     {
        return [
            'required' => '* campo obrigatório',
            'string' => '* campo aceita apenas caracteres.',
            'unique' => '* produto já existente.',
            'lowercase' => '* campo aceita apenas caracteres minúsculos.',
            'max' => '* quantidade de caracteres inválido, 3 apenas são aceitos',
            'boolean' => '* campo aceita apenas true ou false'
        ];
     }
}
