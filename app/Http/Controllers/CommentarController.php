<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Posting;
use App\Models\Komentar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentarController extends Controller
{

    public function index()
    {
        $koment = Komentar::all();

        return Inertia::render('index', [
            'komentar' => $koment,
        ]);
    }


    public function store(Request $request){

        $request->validate([
            'comment' => 'required',
            'postid' => 'required',
        ]);

        // Check if the user is authenticated
        if(Auth::check()) {
            $user = Auth::user();

            // Create a comment only if the user is authenticated
            $komentar = $user->komentars()->create([
                'postid' => $request->postid,
                'comment' => $request->comment,
            ]);

            return Inertia::location('/');
        } else {
            // Handle the case where the user is not authenticated
            return redirect()->route('login'); // Redirect to the login page, for example
        }
    }


}
