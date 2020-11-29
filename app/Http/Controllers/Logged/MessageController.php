<?php

namespace App\Http\Controllers\Logged;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Message;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MessageController extends Controller
{
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
        // SELEZIONE DEI MESSAGGI DELL'UTENTE
        $messages = Message::select('*', 'messages.id as id_msg')
        ->join('apartments', 'messages.apartment_id', '=', 'apartments.id')
        ->where('apartments.user_id', '=', Auth::user()->id)
        ->orderBy('read', 'asc')
        ->get();
        return view('logged.messages',compact('messages'));
    }
    

    public function update(Request $request, $id)
    {
       $message = Message::find($id);
       $read = !$message->read;
      
       if($message->apartment->user_id  == Auth::id()){
              Message::where('id',$id)->update(['read'=> $read]);
              return redirect()->route('messages.index');
       }
       return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Message $message)
    {   
        if($message->apartment->user_id = Auth::id()) {
            $message->delete();
            return redirect()->back()->with('status', 'Hai eliminato il messaggio');

        } else {
            return redirect()->back()->with('status', 'messaggio non eliminato');
        }


    }
}
