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
    public function index()
    {
        $apps = Apartment::get();
        return view('search.search',compact('apps'));
    }


    public function show(Apartment $apartment)
    {
       $apartment = Apartment::get();
       return view('apartment', compact('apartment'));
    }

}
