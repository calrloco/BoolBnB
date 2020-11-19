<?php

namespace App\Http\Controllers\Logged;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Carbon\carbon;
use App\Apartment;
use App\Service;
use App\Sponsor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HostController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // SE AMMINISTRATORE VENGONO RESTITUITI TUTTI GLI APPARTAMENTI
        if((Auth::user()->role->role)== "admin"){

            $apartments = Apartment::get();
        // SE UTENTE VENGONO VISUALIZZATI GLI APPARTAMENTI DA LUI REGISTRATI
        } elseif ((Auth::user()->role->role)== "host") {
            $apartments = Apartment::where('apartments.user_id', '=' ,Auth::id())
            ->get();
            // ->orderBy('created_at','desc');

        }
        return view('logged.apartments', compact('apartments'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $services = Service::all();
        return view('logged.create', compact('services'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function show($id)
    // {
    //    //  if((Auth::user()->role->role)== "admin"){
    //    //
    //    //      $apartment = Apartment::where('id', '=', $id)
    //    //      ->get();
    //    //  } elseif ((Auth::user()->role->role)== "host") {
    //    //      $apartment = Apartment::where('id', '=', $id)
    //    //      ->where('user_id', Auth::id())
    //    //      ->get();
    //    //  }
    //    //
    //    // return view('logged.show', compact('apartment'));
    // }
       public function show($id)
    {
        //prendo appartamento cercandolo con ID
        $apartment = Apartment::find($id);
        if (empty($apartment)) {
            abort('404');
        }
        //se user ID dell'appartamento non corrisponde con quello loggato, ERROR 403
        if ($apartment->user_id = Auth::user()->id) {
            return view('logged.show', compact('apartment'));
        } else {
            abort('403', 'Accesso non autorizzato');
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function sponsor($id)
    {
        $sponsors = Sponsor::all();
        return view('logged.sponsor', compact('id','sponsors'));
    }
}
