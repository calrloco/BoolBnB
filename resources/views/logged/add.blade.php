@extends('layouts.app')

@section('content')

<div class="container-center">
    <h2>Registra il tuo appartamento</h2>
           
    
    </form>
    <form method="POST" action=""> 
        @csrf
        
        <!-- TITOLO -->
        <div class="input-row">
        <label for="title">Titolo</label>
        <input type="text" name="title" placeholder="Inserisci il titolo" class="" required />
        </div>

        <!-- INDIRIZZO -->
        <div class="input-row">
        <label for="address">Indirizzo</label>
        <input type="text" name="address" placeholder="l'indirizzo del tuo appartamento" class="" required />
        </div>

        <div class="input-row">
            <div class="input-group">
                <div class="label-input">
                    <label for="city">Città</label>
                    <input type="text" name="city">
                </div>
                <div class="label-input">
                    <label for="postal-code">Codice Postale</label>
                    <input type="text" name="postal-code">
                </div>
                <div class="label-input">
                    <label for="country">Nazione</label>
                    <input type="text" name="country">
                </div>
            </div>
        </div>

        <div class="input-row">
            <label for="description">Descrizione dell'appartamento</label>
            <textarea name="description" rows="10"></textarea>
        </div>

        <!-- CARATTERISTICHE-->
        <div class="input row">
            <div class="input-group">
                <div class="label-input">
                    <label for="daily-price">Prezzo per notte</label>
                    <input type="number" name="daily-price">
                </div>  
                <div class="label-input">
                    <label for="sm">Metri quadri</label>
                    <input type="number" name="sm">
                </div>  
                <div class="label-input">
                    <label for="beds">Posti letto</label>
                    <input type="number" name="beds">
                </div>
                <div class="label-input">
                    <label for="bathrooms">Bagni</label>
                    <input type="number" name="bathrooms">
                </div>
            </div>

            <div class="input-row">
                @foreach($services as $service)
                <label for="services">{{ $service->service . " " . $service->icon }}</label>
                <input type="checkbox" name="services[]" value="{{ $service->id }}">
                @endforeach

            </div>

                <input type="hidden" name="user-id" value="{{ Auth::user()->id }}">
        </div>






    
</div>


