@extends('layouts.app')

@section('content')
{{-- @dd($messages) --}}
<div class="container-center">

    <div class="head">
        {{-- <a href="{{ route('host.create')}}">crea appartamento temporaneo</a> --}}
        <h2 class="title">I tuoi appartamenti</h2>
    </div>
    @if (!empty($apartments))
    <div class="apartments-list">
        @foreach($apartments as $apartment)
        <div class="apt-info-general">
            <div class="apt-info-sx">
                {{-- <div class=apt-img-small></div> --}}
                    <img class=apt-img-small src="{{$apartment->images[0]->path}}" alt="{{$apartment->title}}">

            </div>
            <div class="apt-info-dx">
                 <div class="apt-title">
                   <p>{{$apartment->title}}</p>
                </div> 
                <div class ="apt-description">
                    <p class="apt-address">{{ $apartment->city }}, {{ $apartment->country }}</p>
                    {{-- <p class="apt-city">{{ $apartment->city }}</p> --}}
                </div>
                <p class="apt-details"> Caratteristiche: nr. stanze: {{ $apartment->rooms }}, nr. letti: {{ $apartment->beds }} - nr. bagni: {{ $apartment->bathrooms }} - mq: {{ $apartment->sm }}</p>
                <p class="apt-description">{{$apartment->description}}</p>
                <ul class = "apt-services">
                    @foreach ($apartment->services as $service)
                        <li class = "service">
                                <i class="service-icon {{$service->icon}}"></i>
                                <p class="service-title">{{ $service->service }}</p>
                         </li>
                    @endforeach
                </ul>
                {{-- <a href="{{ route('host.show', $apartment->id) }}">Vedi l'appartamento</a> --}}
            </div>
            <a href="{{ route('host.show', $apartment->id) }}" class="apartment-button">Vai  all'appartamenoto</a>
        </div>
        @endforeach
    </div>
    @else
        <div class="noapt-section">
            <div class="create-apt-section">
                <p class="alert-noapt">Non hai ancora registrato un appartamento</p>
                <a class="create-apt-link" href="{{ route('host.create')}}">Crea un nuovo annuncio!</a>
            </div>
        </div>
    @endif

</div>

@endsection
