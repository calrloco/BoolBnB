@extends('layouts.app')

@section('content')
{{-- @dd($messages) --}}
<div class="container-center">
<a href="{{ route('host.create')}}">crea appartamento temporaneo</a>
    @if (!empty($messages)) 
    <h2>I tuoi messaggi</h2>
    <div class=messages-deck>
        @foreach($messages as $message)
        <div class="message-card">
            <div class="apart-info">
                <div class=apart-img>
                    <img src="{{$message->path}}" alt="">
                </div>
                <div>
                    <p>{{ $message->title }}</p>
                </div>
            </div>
            <div class="message-info">
                <p> <strong>Da: </strong> {{ $message->email }}</p>
                <p> <strong>Messaggio: </strong> {{ $message->message }}</p>
            </div>
        </div>
        @endforeach   
    
    </div>
    @else
    <h2>I tuoi messaggi</h2>
    @endif

</div>











@endsection