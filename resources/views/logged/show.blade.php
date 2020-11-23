@extends('layouts.app')
@section('content')
<section class="top-section">
    <div class="title-apt">
    <p class="title">{{ $apartment->title }}</p>
    <a class="address-apt" href="#">{{ $apartment->address }}, {{ $apartment->city }}, {{ $apartment->country }}</a>
    </div>
</section>
<section class="slider-section">
    <div class="apt-images">
        <i class="far fa-arrow-alt-circle-left arrow-slider-sx"></i>
        @for($i = 0; $i < $apartment->images->count('id'); $i++)
            <img class="apt-image {{($i == 0 ? 'active first' : (($i == $apartment->images->count('id')-1) ? 'hidden last' :'hidden'))}}" src="{{ $apartment->images[$i]->path }}" alt="{{$apartment->title}}">
        @endfor
        <i class="far fa-arrow-alt-circle-right arrow-slider-dx"></i>
    </div>
</section>

<section class = "info-apt-section">
    <div class="info-box-sx">
        <div class="info-apt-summary">
            <div class="apt-summary">
                <p class="info-host">Host: {{ $apartment->user->name }} - Prezzo: €{{ $apartment->daily_price }}/giorno</p>
                <p class="info-apt"> nr. stanze: {{ $apartment->rooms }}, nr. letti: {{ $apartment->beds }} - nr. bagni: {{ $apartment->bathrooms }} - mq: {{ $apartment->sm }}</p>
            </div>
            <div class="host-logo">
                <img src="" alt="">
            </div>
        </div>
        <hr class = "split-line">
        <div class="apt-description">
            <p>{{ $apartment->description }}</p>
        </div>
        <hr class = "split-line">
        <div class="services-box">
            <p class="services-title">Servizi</p>

            <ul class = "services">
                @foreach ($apartment->services as $service)
                    <li class = "service">
                        <span><i class="{{$service->icon}}"></i></span>
                        <p>{{ $service->service }}</p>
                        <span>{{ $service->description }}</span>
                     </li>
                @endforeach
            </ul>
        </div>
    </div>
    <div class="info-box-dx">
        <div class="send-message-box">
            <p class="message-title">Statistiche appartamento</p>
            <div class="message-form">
                <a href="{{ route('logged.sponsor', $apartment->id )}}">Sponsorizza il tuo appartamento!</a>
            </div>
        </div>
    </div>
</div>

<section class="map-section">
    <div class="map-box">
        STATISTICHE
    </div>
    {{-- <div class="message-box">

    </div> --}}
</section>
@endsection
