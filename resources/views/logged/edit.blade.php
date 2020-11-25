@extends('layouts.app')

@section('content')

<div class="container-center  create-update">
    <h2>Modifica il tuo appartamento</h2>
           
    
<form id="editing" action="{{ route('host.update', $apartment->id) }}" name="editing" method="POST" enctype="multipart/form-data">
        @csrf
        @method("PATCH")

        <!-- TITOLO -->
        <div class="input-row">
            <label for="title">Titolo</label>
            <input type="text" id="title" name="title" class="" value="{{ $apartment->title }}"/>
            <p class="message"></p>
        </div>

        <!-- INDIRIZZO -->
        <div class="input-row">
            <label for="address">Indirizzo</label>
            <input type="text" id="address" name="address" class="" value="{{ $apartment->address }}"/>
            <p class="message"></p>
        </div>

        <div class="input-row">
            <div class="input-group">
                <div class="label-input">
                    <label for="city">Città</label>
                    <input id="city" type="text" name="city" value="{{ $apartment->city }}">
                    <p class="message"></p>
                </div>
                <div class="label-input">
                    <label for="postal_code">Codice Postale</label>
                    <input id="postal-code" type="text" name="postal_code" value="{{ $apartment->postal_code }}">
                    <p class="message"></p>
                </div>
                <div class="label-input">
                    <label for="country">Nazione</label>
                    <input id="country" type="text" name="country" value="{{ $apartment->country }}">
                    <p class="message"></p>
                </div>
            </div>
        </div>

        <div class="input-row">
            <label for="description">Descrizione dell'appartamento</label>
            <textarea id="description" name="description" rows="10">{{ $apartment->description }}</textarea>
            <p class="message"></p>
        </div>

        <!-- CARATTERISTICHE-->
        <div class="input row caratteristiche">
            <div class="input-group">
                <div class="label-input">
                    <label for="daily_price">Prezzo per notte</label>
                    <input id="daily-price" type="number" name="daily_price" value="{{ $apartment->daily_price }}">
                    <p class="message"></p>
                </div>  
                <div class="label-input">
                    <label for="sm">Metri quadri</label>
                    <input id="sm" type="number" name="sm" value="{{ $apartment->sm }}">
                    <p class="message"></p>
                </div><div class="label-input">
                    <label for="rooms">Stanze</label>
                    <input  id="rooms" type="number" name="rooms" value="{{ $apartment->rooms }}">
                    <p class="message"></p>
                </div>  
                <div class="label-input">
                    <label for="beds">Posti letto</label>
                    <input id="beds" type="number" name="beds" value="{{ $apartment->beds }}">
                    <p class="message"></p>
                </div>
                <div class="label-input">
                    <label for="bathrooms">Bagni</label>
                    <input id="bathrooms" type="number" name="bathrooms" value="{{ $apartment->bathrooms }}">
                    <p class="message"></p>
                </div>
            </div>

            <!-- SERVIZI -->
            <div class="input-group">
                @foreach($services as $service)
                <div class="label-input">
                    <span><i class="{{$service->icon}}"></i></span>
                    <label for="services">{{ $service->service }}</label>
                    <input type="checkbox" name="services[]" value="{{ $service->id }}" {{ ($apartment->services->contains($service->id)) ? "checked" : "" }}>
                </div>
                @endforeach

            </div>

            <!-- IMMAGINI -->
            <h5>Aggiungi immagini</h5>
            <div class="container-upload">
                <input type="file" name="img[]" id="img" accept="image/*" multiple>
              
            </div>

            
            
            <!-- CAMPI HIDDEN -->
            
            <input type="hidden" name="user_id" value="{{ Auth::user()->id }}">
            
            <input id="latitude" type="hidden" name="latitude" value="{{$apartment->latitude}}">
            <input id="longitude" type="hidden" name="longitude" value="{{$apartment->longitude}}">
            
            
            
            
            
            <input type="submit" id="crea">
            
            
            
        </div>
    </form>
    
    {{-- status di avvenuta cancellazione immagine --}}
    @if(session('status'))
    <p>{{session('status')}}</p>
    @endif
    
    <p>elimina le immagini</p>
    {{-- ciclo per visualizzazione ed eliminazione delle immagini dell'appartamento --}}
    @foreach($apartment->images as $image)
    <form action="{{route('images.destroy', $image)}}" method="post" class="img-apt-box">
        @csrf
        @method('DELETE')
        <img src="{{ asset('storage/'. $image->path) }}" alt="foto appartamento">
        <button type="submit" class="img-delete"><i class="fas fa-times x"></i></button>
    </form>
    @endforeach
    

    

    
</div>
@endsection
