<?php
use App\Apartment;
use App\Message;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SendMessageController extends Controller
{
   
  
    // controller per invio messaggio
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'reuqired|min:2',
            'lastname'=>'min|:2',
            'email'=>'required|email',
            'message'=>'required|min:5',
            'apartment_id'=>'required'
        ],
        [
            'required' =>'compila tutti i campi per andare avanti'
        ]);
        if($validator->fails()){
            $error = $validator->messages();
            return view('xxx')->with($error);
        }
        $success = 'messagio inviato con successo';
        Message::create($request->all());
        return view('home')->with($success);
    }

}
