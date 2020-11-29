<?php

namespace App\Http\Controllers;

use App\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ViewsController extends Controller
{
    
    public function store(Request $request)
    {
        // parte sotre chiedo l'ip del client
        $clientIp = $request->ip();
        $id = $request->input('apartment_id');
        // creo una variabile per controllere se esiste il dato con questo ip alla data di oggi
         $viewCheck = View::where('ip_guest', '=', $clientIp)
             ->whereRaw('DATE(views.created_at) = CURRENT_DATE')
             ->where('apartment_id','=',$id)
             ->get();
         if (count($viewCheck) < 1) {
             $validator =  [
                 'apartment_id' => $id,
                 'ip_guest' => $clientIp
             ];
             View::create($validator);
         }
        return redirect()->route('cerca',$id);
    }
}
