@extends('layouts.app')

@section('content')

<div class="container-center">

    <label for="sponsor-select">Scegli la tua sponsorizzazzione:</label>

    <select name="sponsors" id="sponsors-select">
        <option value="">--Please choose an option--</option>
        @foreach ($sponsors as $sponsor)
            <option value="{{$sponsor}}">{{$sponsor->sponsor}} - €{{$sponsor->sponsor_price}}</option>
        @endforeach
    </select>

    <button type="button" name="btn-sponsor" id="btn-sponsor">Sponsor!</button>

    <input type="hidden" id="apt-id" name="" value="{{$id}}">

    <div class="price-sponsor">
        <strong>Il prezzo da pagare è: </strong>
        <p id="summary-sponsor"></p>
    </div>
    <button type="button" name="button"></button>
</div>
@endsection
