<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required|min:10|max:300',
            'rooms'=>'required|numeric|min:1',
            'beds' =>'required|numeric|min:1',
            'bathrooms'=>'required|min:1',
            'sm'=>'required|min:1',
            'address'=>'required|min:10',
            'latitude'=>'required',
            'longitude'=>'required',
            'city'=>'required|min:1',
            'postal_code'=>'required',
            'country'=>'required',
            'daily_price'=>'required',
            'description'=>'required|min:20',
            'user_id'=>'numeric|exists:users,id',
     ],
     [
      'required'=>':attribute is a required field',
      'numeric'=>':attribute must be a number',
      'exists'=>'the room need to be associated to an existing user',
     ]
 );
     if($validator->fails()){
         $error = $validator->messages();
         return response()->json($error);
     }
     $apartment = Apartment::create($request->all());
     $apartment->services()->attach($request['services']);
     
     if (!empty($request['img'])) {
         $request['img'] = Storage::disk('public')->put($request['img'], 'images');
         //nel database salvo il percorso che creo con Storage

     }

     dd($apartment);
     // if (!empty($request['img'])) {
     //     foreach ($request['img'] as $image) {
     //         $image = Storage::disk('public')->put('images', $image);
     // }

     return response()->json($apartment,201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
}
