@extends('layouts.app')

@section('content')
    {{-- @dd($messages) --}}
    <div class="container-center">
        <a href="{{ route('host.create') }}">vedi tuoi appartamenti</a>
        @if (!empty($messages))
            <h2>I tuoi messaggi</h2>
            <div class=messages-deck>
                @foreach ($messages as $message)
                    @if ($message->read == '0')
                        <div class="message-card">
                            <div class="apart-info">
                                <div class=apart-img>

                                </div>
                                <div>
                                    <p>{{ $message->title }}</p>
                                </div>
                            </div>
                            <div class="message-info">
                                <p> <strong>Da: </strong> {{ $message->email }}</p>
                                <p> <strong>Messaggio: </strong> {{ $message->message }}</p>
                            </div>
                            <button class="delete">DELETE</button>
                            <button class="read">Mark as read</button>
                        </div>
                    @endif
                @endforeach

            </div>
        @else
            <h2>Non hai messaggi</h2>
        @endif

    </div>











@endsection
