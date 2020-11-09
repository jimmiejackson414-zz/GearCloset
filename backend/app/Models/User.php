<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email',
        'password',
        'avatar_url',
        'address_1',
        'address_2',
        'city',
        'state',
        'country',
        'first_name',
        'last_name',
        'trail_name',
        'subscription_level',
        'measuring_system',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    //Relationships //TODO: Work on these, will probably need to be HasManyThrough relationships
    public function posts(): HasMany
    {
        return $this->hasMany(ForumPost::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(ForumComment::class);
    }
}