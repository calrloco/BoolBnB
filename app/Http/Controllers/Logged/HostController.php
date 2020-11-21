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
use Illuminate\Support\Facades\Validator;

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
            'img' =>'image'
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

        dd($request->img, $request['img']);

        // if (!empty($request['img'])) {
            // $request['img'] = Storage::disk('public')->put('images', $request['img']);
            //nel database salvo il percorso che creo con Storage

        // }

        $image = Storage::disk('public')->put('images', $image);

        // }

        // if($request->hasFile('image')) {
        //     foreach($request->file('image') as $image) {
        //         $fileName = time()."_". $image->getClientOriginalName();
        //         $request->file('image')->storeAs('upload', $filename);
        //     }
        // }



        // $images = $request['img'];

        // foreach ($images as $image) {

        // {
        //     path: $request->img,
        //     apartment_id: $request->user_id
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
        if((Auth::user()->role->role)== "admin"){

            $apartment = Apartment::find($id)
            ->get();
        } elseif ((Auth::user()->role->role)== "host") {
            $apartment = Apartment::find($id)
            ->where('user_id', Auth::id())
            ->first();
        }

       return view('logged.show', compact('apartment'));
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
