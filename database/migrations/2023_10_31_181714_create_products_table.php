<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('code',45) -> nullable(false);
            $table->string('product',255) -> nullable(false);
            $table->string('brand',255) -> nullable(true);
            $table->string('color',255) -> nullable(true);
            $table->string('size',45) -> nullable(true);
            $table->string('sexo',11) -> nullable(false);
            $table->string('observation',255) -> nullable(true);
            $table->boolean('breakdown') -> nullable(false);
            // $table->boolean('low') -> nullable(false);
            $table->string('description',255) -> nullable(true);
            $table->integer('amount') -> nullable(false);
            $table->boolean('pending') -> nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }

    
};
