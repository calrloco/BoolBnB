@extends('layouts.app')
@section('content')

    <div class="container__search">
        <div class="container__search-left">
            <div class="search__resoults-title">
                <p>I tuoi risultati</p>
            </div>
            <div class="search__resouts-filters"></div>
            <div class="search__resoults__apartment">
                <div class="search__resoults__apartment-cards"></div>
            </div>
        </div>
        <div class="container__search-right"></div>
        
    </div>
        <script id="handlebars_cards" type="text/x-handlebars-template">
            <div class="search__resoults__apartment-cards-content">
               <form action="{{route('view.store')}}" method="POST">
                @csrf
                @method('POST')
                @{{{id}}}
                <button type="submit">
                <img class="search__resoults__apartment-cards-content-img" src="@{{img}}">
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
    @endsection
