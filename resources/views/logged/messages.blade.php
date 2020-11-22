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
                <p> <strong>Da: </strong> {{ $message->email }}</p>
                <p> <strong>Messaggio: </strong> {{ $message->message }}</p>
            </div>
            <div class="button-section">
                {{-- controllo messaggio letto --}}
                @If($message->read == 0) 
                <form action="{{ route('messages.update', $message->id_msg) }}" method="post">
                    @csrf
                    @method('PATCH')
                    <button type="submit"><i class="fas fa-envelope"></i></button>
                </form>
                @else
                <form action="{{ route('messages.update', $message->id_msg) }}" method="post">
                    @csrf
                    @method('PATCH')
                    <button type="submit"><i class="fas fa-envelope-open"></i></button>
                </form>
                @endif

                <form action="{{ route('messages.destroy', $message->id_msg) }}" method="post">
                    @csrf
                    @method('DELETE')
                    <button type="submit"><i class="fas fa-trash-alt"></i></button>
                </form>
            </div>
        </div>
        @endforeach   
    
    </div>
    @else
    <h2>Non hai messaggi</h2>
    @endif

</div>











@endsection