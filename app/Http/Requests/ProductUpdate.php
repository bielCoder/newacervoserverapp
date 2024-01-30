<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdate extends FormRequest
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
            'product' => ['required','string','lowercase'],
            // 'code' => ['required','unique:products,code','lowercase'],
            'brand' => 'lowercase',
            'color' => 'lowercase',
            'size' => ['lowercase','max:3'],
            'sexo' => ['required','string'],
            // 'observation' => 'string',
            'breakdown' => ['required','boolean'],
            // 'pending' => ['required','boolean']

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
            // 'boolean' => 'campo aceita apenas true ou false'
        ];
     }
}
