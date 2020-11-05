<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function(Blueprint $table) {
            $table->string('avatar_url')->nullable()->default(NULL);
            $table->string('first_name');
            $table->string('last_name');
            $table->string('trail_name');
            $table->string('address_1')->nullable()->default(NULL);
            $table->string('address_2')->nullable()->default(NULL);
            $table->string('city')->nullable()->default(NULL);
            $table->string('state')->nullable()->default(NULL);
            $table->string('country')->nullable()->default(NULL);
            $table->string('subscription_level');
            $table->string('measuring_system');
            $table->dropColumn('name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
