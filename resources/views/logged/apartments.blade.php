@extends('layouts.app')

@section('content')

<div class="apt-section">

    <div class="head">
        <h2 class="title">I tuoi appartamenti</h2>
    </div>
    @if (!empty($apartments))
    <div class="apartments-list">
        @foreach($apartments as $apartment)
        <div class="apt-info-general">
            <div class="apt-info-sx">
                    <img class=apt-img-small src="{{$apartment->images[0]->path}}" alt="{{$apartment->title}}">
            </div>
            <div class="apt-info-dx">
                <div class ="apt-description">
                    <a class="title" href="{{ route('host.show', $apartment->id) }}"><strong>{{$apartment->title}}</strong></a>
                    <p class="apt-address">{{ $apartment->city }}, {{ $apartment->country }}</p>
                </div>
                <p class="apt-details"> Caratteristiche: nr. stanze: {{ $apartment->rooms }}, nr. letti: {{ $apartment->beds }} - nr. bagni: {{ $apartment->bathrooms }} - mq: {{ $apartment->sm }}</p>
                <ul class = "apt-services">
                    @foreach ($apartment->services as $service)
                        <li class = "service">
                                <i class="service-icon {{$service->icon}}"></i>
                                <p class="service-title">{{ $service->service }}</p>
                         </li>
                    @endforeach
                </ul>
            </div>
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
