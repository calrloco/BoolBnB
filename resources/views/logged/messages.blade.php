@extends('layouts.app')

@section('content')

<div class="container-center">
    {{-- avviso di riuscita eliminazione messaggio --}}
    @if (session('status'))
    <div class="alert alert-success">
        {{ session('status') }}
    </div>
    @endif
    
    {{-- controllo presenza di messaggi --}}
    @if (!empty($messages)) 
    <h2>I tuoi messaggi</h2>
    <div class=messages-deck>
        

        @foreach($messages as $message)
    <div class="message-card {{ (($message->read == 0) ? 'unread' : 'read') }}">
            <div class="apart-info">
                <div class=apart-img>
                <img src="{{ $message->apartment->images[0]->path }}" alt="foto appartamento">
                </div>
                <div>
                    <p>{{ $message->apartment->title }}</p>
                </div>
            </div>
            <div class="message-info">
                <p> <strong>Da: </strong> {{ $message->name . " " . $message->lastname }}</p>
                <p> <strong>Email: </strong> {{ $message->email }}</p>
                <p> <strong>Messaggio: </strong> {{ $message->message }}</p>
            </div>
            <div class="button-section">
                {{-- controllo messaggio letto --}}
               
                <form action="{{ route('messages.update', $message->id_msg) }}" method="post">
                    @csrf
                    @method('PATCH')
                    <button type="submit">
                        @If($message->read == 0) 
                        <i class="fas fa-envelope"></i>
                        @else
                        <i class="fas fa-envelope-open"></i>
                        @endif
                    </button>
                </form>
               
                <form action="{{ route('messages.destroy', $message->id_msg) }}" method="post">
                    @csrf
                    @method('DELETE')
                    <button type="submit"><i class="fas fa-trash-alt"></i></button>
                </form>
            </div>
        </div>
        @endforeach   
    
    </div>











@endsection
