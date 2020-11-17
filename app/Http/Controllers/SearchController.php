<?php

namespace App\Http\Controllers;
use App\Apartment;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $address = $request->address;
        return view('search.search', compact('address'));
    }


    public function show(Apartment $apartment)
    {
       $apartment = Apartment::get();
       return view('apartment', compact('apartment'));
    }

}
