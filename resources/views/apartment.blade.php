@extends('layouts.app')
@section('content')
<section class="top-section">
    <div class="title-apt">
    <p class="title">Titolo Appartamento</p>
    <a class="address-apt" href="#">Address apt</a>
    </div>
</section>
<section class="slider-section">
    <div class="slider-img">
        <i class="far fa-arrow-alt-circle-left"></i>
        <img class="apt-img-slider" src="" alt="">
        <i class="far fa-arrow-alt-circle-right"></i>
    </div>
</section>


<section class = "info-apt-section">
    <div class="info-box-sx">
        <div class="info-apt-summary">
            <div class="apt-summary">
                <p class="info-host">Tipologia casa - Host: Pietro</p>
                <p class="info-apt"> nr ospiti - nr. letti - nr. bagni - mq</p>
            </div>
            <div class="host-logo">
                <img src="" alt="">
            </div>
        </div>
        <hr class = "split-line">
        <div class="apt-description">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <hr class = "split-line">
        <div class="services-box">
            <p class="services-title">Servizi</p>
            <ul class = "services">
                <li class = "service"><i class="fas fa-parking"></i>Parcheggio gratuito</li>
                <li class = "service"><i class="fas fa-tv"></i>TV</li>
                <li class = "service"><i class="fas fa-wifi"></i>Wi-Fi</li>
                <li class = "service"><i class="fas fa-laptop"></i>Zona lavoro user-friendly</li>
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
