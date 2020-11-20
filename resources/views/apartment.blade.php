@extends('layouts.app')
@section('content')
<section class="top-section">
    <div class="title-apt">
    <p class="title">{{$apartment->title}}</p>
    <a class="address-apt" href="#">{{ $apartment->address }}, {{ $apartment->city }}, {{ $apartment->country }}</a>
    </div>
</section>
<section class="slider-section">
    <div class="slider-img">
        <i class="far fa-arrow-alt-circle-left arrow-slider-sx"></i>
        @for($i = 0; $i < $apartment->images->count('id'); $i++)
            <input id="check-info-img" type="hidden" name="" value="{{$apartment->images}}">
        @endfor

        {{-- @foreach ($apartment->images as $image)
            <input class="check-info-img" type="hidden" name="" value="{{$image}}">
        @endforeach --}}

        <img class="apt-img-slider" src="" alt="">
        <i class="far fa-arrow-alt-circle-right arrow-slider-dx"></i>
    </div>
</section>


<section class = "info-apt-section">
    <div class="info-box-sx">
        <div class="info-apt-summary">
            <div class="apt-summary">
                <p class="info-host">Host: {{ $apartment->user->name }} - Prezzo: €{{ $apartment->daily_price }}/giorno</p>
                <p class="info-apt">  nr. stanze: {{ $apartment->rooms }}, nr. letti: {{ $apartment->beds }} - nr. bagni: {{ $apartment->bathrooms }} - mq: {{ $apartment->sm }}</p>
                {{-- <p class="price">Prezzo giornaliero: €{{ $apartment->daily_price }}</p> --}}
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
                        <p class="service-title">{{ $service->service }}</p>
                        <span>{{ $service->description }}</span>
                     </li>
                @endforeach
            </ul>
        </div>
    </div>
    <div class="info-box-dx">
        <div class="send-message-box">
            <p class="message-title">Contatta l'Host!</p>
            <div class="message-form">
                <form class="" action="" method="post">
                    <p class "firstname-message">
                    <label for="fname">Nome:</label>
                    <input type="text" id="fname" name="fname">
                    </p>
                    <p class "lastname-message">
                    <label for="lname">Cognome:</label>
                    <input type="text" id="lname" name="lname">
                    </p>
                    <p class "email-message">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email">
                    </p>
                    <p class "text-message">
                    <label for="message">Testo:</label>
                    <textarea name="message" maxlenght="500" class="message" cols="30" rows="10">
                    </textarea>
                    </p>
                    <p class "send-message">
                    <input type="submit" name="mail-submit" value="Invia mail!"></input>
                    </p>
                </form>
            </div>

        </div>
    </div>

</div>

<section class="map-section">
    <div class="map-box">
        MAPPA
    </div>
    {{-- <div class="message-box">

    </div> --}}
</section>
@endsection
