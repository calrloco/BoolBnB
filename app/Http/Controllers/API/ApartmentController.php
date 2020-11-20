<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Apartment;
use App\Image;
use Illuminate\Support\Facades\Validator;

class ApartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){

        $validator = Validator::make($request->all(),[
             'lat'=>'required',
             'lng'=>'required',
             'maxDist'=>'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->messages());
        }
        $query = Apartment::selectRaw("*, ST_Distance_Sphere(point($request->lng,$request->lat), 
        point(longitude, latitude)) * .001 as distance")->having('distance','<=',$request->maxDist)->orderBy('distance','asc')->get();
        return response()->json($query, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Apartment $apartment){
        return response()->json($require,200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Apartment $apartment){
        $apartment->update($request->all());
        $apartment->services()->sync($request['services']);
        return response()->json($apartment);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Apartment $apartment)
    {
         $apartment->delete();
         $message = [
           'messagio' =>'appartamento numero '.$apartment->id.' cancellato con successo'
         ];
         return response()->json($message);
    }
}
