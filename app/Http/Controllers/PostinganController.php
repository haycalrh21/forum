<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Posting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostinganController extends Controller
{

    public function index()
    {
        $posting = Posting::with('komentars')->get();

        return response()->json( [
            'posting' => $posting,
        ]);
    }




    public function store(Request $request)
    {
        $request->validate([

            'judul' => 'required|unique:postings',
            'isi' => 'required',
            'gambar' => 'nullable',
        ]);


        $user = Auth::user();
        $posting = $user->postings()->create([
            'judul' => $request->judul,
            'isi' => $request->isi,
            'gambar' => $request->gambar,
        ]);


        // dd(Posting);

        return Inertia::location(route('posting'));
    }

}
