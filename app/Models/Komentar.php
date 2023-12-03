<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Komentar extends Model
{
    protected $fillable = ['userid','postid', 'comment'];

    public function post()
    {
        return $this->belongsTo(Post::class, 'postid');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'userid');
    }

}
