@extends('layouts.app')

@section('content')
{{-- @dd($messages) --}}
<div class="container-center">
<a href="{{ route('host.create')}}">crea appartamento temporaneo</a>
    @if (!empty($apartments))
    <h2>I tuoi appartamenti</h2>
    <div class=messages-deck>
        @foreach($apartments as $apartment)
        <div class="message-card">
            <div class="apart-info">
                <div class=apart-img>
                    <img src="{{$apartment->title}}" alt="">
                </div>
                <div>
                    <p>{{ $apartment->address }}</p>
                <span>{{ $apartment->city }}</span>
                </div>
            </div>
            <div class="message-info">
                <p> {{ $apartment->beds }} </p>
                <p> {{ $apartment->rooms }}</p>
                <ul>
                    @foreach($apartment->services as $service)
                    <li>
                        <div class="label-input">
                            <span> <i class="{{$service->icon}}"></i></span>
                            <span> {{ $service->service }} </span>
                            <span> {{ $service->id }} </span>
                        </div>
                    </li>
                    @endforeach
                </ul>
                <a href="{{ route('host.show', $apartment->id) }}">Vedi l'appartamento</a>
            </div>
        </div>
        @endforeach

    </div>
    @else
    <h2>Non hai ancora registrato un appartamento</h2>
    @endif

</div>











@endsection
