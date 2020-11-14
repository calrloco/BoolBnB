@extends('layouts.app')
@section('content')

    <header class="jumbotron">
        <div class="container-center container-fullheight">
            <div class="jumbotron__text">
                <p class="jumbotron__text-banner">Vicino e bello</p>
                <button class="jumbotron__text-button">Esplora i soggiorni nei dintorni</button>
            </div>
        </div>
    </header>
    <div class="container-center">
        <section class="highlited">
            <p class="sponsor__home-title">In evidenza</p>
            <div class="sponsor__home">
                @for ($i = 0; $i < 4; $i++)
                    <div class="sponsor__home-card">
                        <div class="sponsor__home-card-img">
                            <img src="https://a0.muscache.com/im/pictures/a0316ecb-e49b-4b3a-b6b6-c2876b820e8c.jpg?im_w=720"
                                alt="">
                        </div>
                        <div class="sponsor__home-card-text">
                            <p>{{ $apartment[$i]->title }}</p>
                        </div>
                    </div>
                @endfor
        </section>
    </div>
    {{-- <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    {{ __('You are logged in!') }}
                </div>
            </div>
        </div>
    </div> --}}

@endsection
