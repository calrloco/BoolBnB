<?php

namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
namespace App\Http\Controllers\API;
use App\Message;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    
    
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
       $message = Message::find($id);
      
       $user = Auth::id();
       //dd($user);
       dd($message->apartment->user_id);
       if($message->apartment->user_id  == $user){
              Message::where('id',$id)->update(['read'=>1]);
       }
         
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        Message::where('id', $id)->delete();
    }
}
