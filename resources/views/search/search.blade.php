@extends('layouts.app')
@section('content')

    <div class="container__search">
        <div class="container__search-left">
        <div class="container__search-left-top">
            <div class="search__resoults-title">
                <p>I tuoi risultati per</p>
                <p id="address-inst">{{$address ?? ''}}</p>
            </div>
            <div class="search__resouts-filters">
                <div class="services">
                   
                </div>
            </div>
        </div>
            <div class="search__resoults__apartment">
                <div class="search__resoults__apartment-cards">
                    
                </div>
            </div>
        </div>
        <div class="container__search-right" id="map"></div>
        
    </div>
 
        <script id="handlebars_cards" type="text/x-handlebars-template">
            <div class="search__resoults__apartment-cards-content" data-service="">
               <form action="{{route('view.store')}}" method="POST">
                @csrf
                @method('POST')
                @{{{id}}}
                <button type="submit">cerca</button>
                <img class="search__resoults__apartment-cards-content-img" src="https://www.imgcinemas.it/wp-content/uploads/2017/12/elab_sfondonero-copia.png">
                </button>    
                </form>
                <p class="search__resoults__apartment-cards-content-description">
                    @{{ city }}
                </p>
                <p class="search__resoults__apartment-cards-content-description">
                    @{{ title }}
                </p>
                
            </div>
        </script>
    <script src="{{ asset('js/map.js')}}"></script>
@endsection
