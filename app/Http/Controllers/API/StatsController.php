<?php

namespace App\Http\Controllers\API;
use App\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class StatsController extends Controller
{
    
    /**
     * Display the specified resource.
    * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function Index(Request $request)
    {
        $id = $request->id;
       
        $views =  DB::table('views')->selectRaw('DATE(views.created_at) as date,COUNT(DATE(views.created_at)) as daily_views')
            ->join('apartments', 'views.apartment_id', '=', 'apartments.id')
            ->where('apartment_id', '=', $id)
            ->groupBy('views.created_at')->get();
            $count = count($views);

        return response()->json($views);
    }
}
