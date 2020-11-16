<?php

namespace App\Http\Controllers;

use App\View;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ViewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $views =  DB::table('views')->selectRaw('DATE(views.created_at),COUNT(DATE(views.created_at)) as daily_views')
            ->join('apartments', 'views.apartment_id', '=', 'apartments.id')
            ->where('apartment_id', '=', $id)
            ->groupBy('views.created_at')->get();
            $count = count($views);
            return view('test',compact('views'));
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,$id)
    {
         
        // parte sotre chiedo l'ip del client
        $clientIp = $request->ip();
        // creo una variabile per controllere se esiste il dato con questo ip alla data di oggi
        $viewCheck = View::where('ip_guest', '=', $clientIp)
            ->whereRaw('DATE(`views.created_at`) = CURRENT_DATE')
            ->where('apartment_id','=',$id)
            ->get();
        if (count($viewCheck) < 1) {
            $validator =  [
                'apartment_id' => $id,
                'ip_guest' => $clientIp
            ];
            View::create($validator);
        }
    }
}
