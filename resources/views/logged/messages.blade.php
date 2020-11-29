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
    <div class="header">
        <p class="title">I tuoi messaggi</p>
    </div>
    <div class="messages-box">
        @foreach($messages as $message)
            <div class="message-card {{ (($message->read == 0) ? 'unread' : 'read') }}">
                <div class="message-card-sx">
                    <div class="apart-img">
                        <img src="{{ $message->apartment->images[0]->path }}" alt="foto appartamento">
                    </div>
                </div>
                <div class="message-card-center">
                    <div class="sender-details-up">
                        <div class="details-sender">
                            <p class="details"> <strong>Da: </strong> {{ $message->name . " " . $message->lastname }}</p>
                            <p class="details"> <strong>Email: </strong> {{ $message->email }}</p>
                        </div>
                        <div class="details-apt">
                            <p class="details"> <strong>Per: </strong> <a class="apt-link" href="{{ route('host.show', $message->apartment->id) }}">{{ $message->apartment->title }}</a></p>
                        </div>
                    </div>
                    <div class="sender-details-down">
                        <p class="message"> <strong>Messaggio: </strong> {{ $message->message }}</p>
                    </div>
                </div>
                <div class="message-card-dx">
                    <div class="button-section">
                        <div class="buttons">
                            {{-- controllo messaggio letto --}}
                            <form action="{{ route('messages.update', $message->id_msg) }}" method="post">
                                @csrf
                                @method('PATCH')
                                <button type="submit">
                                    @if($message->read == 0)
                                    <i class="msg-btn fas fa-envelope"></i>
                                    @else
                                    <i class="msg-btn fas fa-envelope-open"></i>
                                    @endif
                                </button>
                            </form>
                            <form action="{{ route('messages.destroy', $message->id_msg) }}" method="post">
                                @csrf
                                @method('DELETE')
                                <button type="submit"><i class="msg-btn fas fa-trash-alt"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            @endforeach
        </div>


    </div>




    {{-- se non ha messaggi --}}
    @else
    <h2>Non hai messaggi</h2>
    @endif
</div>
@endsection
