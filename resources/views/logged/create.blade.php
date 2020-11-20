@extends('layouts.app')

@section('content')

<div class="container-center">
    <h2>Registra il tuo appartamento</h2>
           
    
    
    <form id="creazione" name="creazione" method="POST" enctype="multipart/form-data">
        @csrf
        @method("POST")

        <!-- TITOLO -->
        <div class="input-row">
            <label for="title">Titolo</label>
            <input type="text" id="title" name="title" placeholder="Inserisci il titolo" class="" required />
        </div>

        <!-- INDIRIZZO -->
        <div class="input-row">
            <label for="address">Indirizzo</label>
            <input type="text" id="address" name="address" placeholder="l'indirizzo del tuo appartamento" class="" required />
        </div>

        <div class="input-row">
            <div class="input-group">
                <div class="label-input">
                    <label for="city">Città</label>
                    <input id="city" type="text" name="city">
                </div>
                <div class="label-input">
                    <label for="postal-code">Codice Postale</label>
                    <input  type="text" name="postal-code">
                </div>
                <div class="label-input">
                    <label id="country" for="country">Nazione</label>
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
                </div><div class="label-input">
                    <label for="rooms">Stanze</label>
                    <input type="number" name="rooms">
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

            <!-- SERVIZI -->
            <div class="input-group">
                @foreach($services as $service)
                <div class="label-input">
                    <span><i class="{{$service->icon}}"></i></span>
                    <label for="services">{{ $service->service }}</label>
                    <input type="checkbox" name="services" value="{{ $service->id }}">
                </div>
                @endforeach

            </div>

            <!-- IMMAGINI -->
            <h5>aggiungi le tue immagini</h5>
            <div class="container-upload">
                {{-- <input type="file" name="img" enctype="multipart/form-data" class="img-input form-control-file" id="img" accept="image/*"> --}}
                <input type="file" name="img[]" class="img-input" id="img" accept="image/*">
                
            </div>
            <a id="add-img" href="#"> <i class="fas fa-plus-circle"></i> </a>


            <!-- CAMPI HIDDEN -->

            <input type="hidden" name="user-id" value="{{ Auth::user()->id }}">
           
            <input id="latitude" type="hidden" name="latitude" value="">
            <input id="longitude" type="hidden" name="longitude" value="">

       
            
            
            
            <input type="submit" id="crea">
            


        </div>
    </form>





</div>
@endsection
