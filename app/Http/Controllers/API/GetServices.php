<?php

namespace App\Http\Controllers\API;
use App\Service;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GetServices extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $id =$request->id;
        $services = DB::table('apartment_service')->where('apartment_id','=',$id)->get();
        return response()->json($services);
    }

   
    public function getAll()
    {
        $services = Service::get();
        return response()->json($services);
    }


}
