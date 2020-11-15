<?php

namespace App\Http\Controllers;

use App\View;
use App\Apartment;
use App\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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
        $views =  DB::table('views')->selectRaw('DATE(views.created_at),COUNT(DATE(views.created_at))')
            ->join('apartments', 'views.apartment_id', '=', 'apartments.id')
            ->join('users', 'apartments.user_id', '=', 'users.id')->where('apartment_id', '=', $id)
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
    public function store(Request $request)
    {

        $clientIp = $request->ip();
        $viewCheck = View::where('ip_guest', '=', $clientIp)
            ->whereRaw('DATE(`views.created_at`) = CURRENT_DATE')->get();
        if (count($viewCheck) < 1) {
            $validator = Validator::make($request->all(), [
                'apartment_id' => 'required'
            ]);
            View::create(array_merge($request->all(), ['ip_guest' => $clientIp]));
        }
    }
}
