@extends('layouts.app')
@section('content')

    <div class="container__search">
        <div class="container__search-left">
        <div class="container__search-left__top">
            <div class="container__search-left__top__text">
                <span class="container__search-left__top__text-heading">I tuoi risultati per</span>
                <span id="address-inst">{{$address ?? ''}}</span>
                <span id="range-form" class="hidden">{{$range ?? ''}}</span>
            </div>
            <div class="container__search-left__top__filters">
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
                <div class="search__resoults__apartment-cards-content-slider">
                    <div class="search__resoults__apartment-cards-content-slider-icons search__resoults__apartment-cards-content-slider-icons-left arrow-slider-dx">
                        <i class="fas fa-chevron-left"></i>
                    </div>
                    <div class="search__resoults__apartment-cards-content-slider-icons search__resoults__apartment-cards-content-slider-icons-right arrow-slider-sx">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>    
            </button>    
             <div class="search__resoults__apartment-cards-content__text">
                <p class="search__resoults__apartment-cards-content-city">
                    @{{ city }}
                </p>
                <p class="search__resoults__apartment-cards-content-description">
                    @{{ title }}
                </p>
                <form action="{{route('view.store')}}" class="search__resoults__apartment-cards-content-form" method="POST">
                    @csrf
                    @method('POST')
                    @{{{id}}}
                    <button type="submit" class="visualizza-appartamneto">Vai all'appartamento</button>
                </form> 
              </div>
              
            </div>
        </script>
    <script src="{{ asset('js/map.js')}}"></script>
@endsection
