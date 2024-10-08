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
        Schema::table('historics', function (Blueprint $table) {
            $table -> string('active_register') -> after('register');
            $table -> string('active_name') -> after('active_register');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('historics', function (Blueprint $table) {
            $table -> string('active_register') -> after('register');
            $table -> string('active_name') -> after('active_register');

        });
    }
};
