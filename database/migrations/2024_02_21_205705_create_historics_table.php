<?php

use Carbon\Carbon;
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
        Schema::create('historics', function (Blueprint $table) {
            $table->id();
            $table->string('name',255)->nullable(false);
            $table->string('register',255)->nullable(false);
            $table->string('function',255)->nullable(false);
            $table->string('department',255)->nullable(false);
            $table->string('email',255)->nullable(false);
            $table->string('product',255) -> nullable(false);
            $table->string('code',45) -> nullable(false);
            $table->string('brand',255) -> nullable(true);
            $table->string('color',255) -> nullable(true);
            $table->string('size',45) -> nullable(true);
            $table->string('sexo',11) -> nullable(false);
            $table->string('observation',255) -> nullable(true);
            $table->boolean('breakdown') -> nullable(false);
            $table->string('description',255) -> nullable(true);
            $table->boolean('pending') -> nullable(false);
            $table->integer('amount') -> nullable(false);
            $table->timestamp('withdraw');
            $table->timestamp('devolution') -> nullable(true);
            $table->integer('days');
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
        Schema::dropIfExists('historics');
    }
};
