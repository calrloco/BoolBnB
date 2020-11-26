@extends('layouts.app')

@section('content')
{{-- @dd($messages) --}}
<div class="container-center">
   @if(session('status'))
    <p class="sposorizzato-session">{{session('status') }}</p>
   @endif

    @if (!empty($apartments))
    <div class="head">
        <h2 class="title">I tuoi appartamenti</h2>
        <a class="create-apt-link" href="{{ route('host.create')}}">Crea un nuovo annuncio!</a>
    </div>
    <div class="apartments-list">
        @foreach($apartments as $apartment)
        <div class="apt-info-general">
            <div class="apt-info-sx">
            @if(isset($apartment->images[0]->path))
                <img class="apt-img-small" src= "{{ asset('storage/' . $apartment->images[0]->path) }}" alt="{{$apartment->title}}">
            @endif                  
            </div>
            <div class="apt-info-dx">
                 <div class="apt-title">
                   <p>{{$apartment->title}}</p>
                </div> 
                <div class ="apt-description">
                    <p class="apt-address">{{ $apartment->city }}, {{ $apartment->country }}</p>
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
