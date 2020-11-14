@extends('layouts.app')

@section('content')

<div class="container-center">

<a href="{{ route('host.create')}}">click</a>
    <h2>I tuoi messaggi</h2>

    <div class=messages-deck>
        <div class="message-card">
            <div class="apart-info">
                <div class=apart-img>
                </div>
                <div><p>Nome Appartamento</p></div>
            </div>
            <div class="message-info">

            </div>
        </div>
        
        <div class="message-card">
            
        </div>
    
        <div class="message-card">
            
        </div>
    
    
    </div>

</div>











@endsection