<?php

namespace App\Models;

use App\Models\User;
use App\Models\Komentar;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Posting extends Model
{
    protected $fillable = ['judul','isi','userid'];

    public function komentars  (){
        return $this->hasMany(Komentar::class, 'postid', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'userid');
    }
}
