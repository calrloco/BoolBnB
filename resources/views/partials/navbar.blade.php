<nav class="nav-container">
    <div class="{{url()->current() == route('search.store') ? 'nav-full' : 'container-center'}}">
        <div class="nav">
            <div class="nav__logo">
                <a href="{{ route('home') }}">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1024px-Airbnb_Logo_B%C3%A9lo.svg.png"
                        alt="">
                </a>
            </div>
            <div class="nav__search">
                <form class="nav__search-button" action="{{ route('search.store') }}" method="POST">
                    @csrf
                    @method('POST')
                     <p id="start-search" class="">Inizia la ricerca<p>
                         <!-- tolta classe hidden da nav__search-city -->
                     <div class="nav__search-city hidden">
                         <label for="search">Dove</label>
                         <input id="search" type="text" name="address" placeholder="dove vuoi andare" autocomplete="off">
                         <div id="auto-complete"></div>
                    </div>
                    <div id="hidenav" class="nav__search-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <div class="nav__search-city hidden">
                         <label for="search">Range: <span id="range-value"></span></label>
                         <input type="hidden" id="range-hidden" name="range" value="">
                         <input type="range" min="20" max="100" value="20" id="myRanges" class="sliders">
                    </div>
                    <button type="{{url()->current() == route('search.store') ? 'button' : 'submit'}}" class="nav__search-icon nav__search-icon-big hidden">
                        Cerca
                        <i class="fas fa-search"></i>
                    </button>
                    
                </form>
            </div>
            <div class="nav__user">
                <div class="nav__user">
                    <div class="nav__user-box">
                        <div class="nav__user-button">
                            <img src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3" alt="">
                        </div>
                        <div class="nav__user-hamburger">
                            <i class="fas fa-bars"></i>
                        </div>
                    </div>
                    <ul class="nav__user__menu">
                        <!-- Authentication Links -->
                        @guest
                            <li class="nav__user__menu-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            @if (Route::has('register'))
                                <li class="nav__user__menu-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                </li>
                            @endif
                        @else
                            <li class="nav__user__menu-item">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }}
                                </a>
                            </li>

                            <li class="nav__user__menu-item">
                               <a href="{{route('messages.index')}}" class="nav-link">Messaggi</a>
                            </li>
                            <li class="nav__user__menu-item">
                                <a href="{{route('host.index')}}" class="nav-link">I tuoi appartamenti</a>
                            </li>
                            <li class="nav__user__menu-item">
                              <a href="{{route('host.create')}}" class="nav-link">Nuovo appartamento</a>
                            </li>
                            <li class="nav__user__menu-item">

                                <a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault();
                                                             document.getElementById('logout-form').submit();">
                                    {{ __('Logout') }}
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                    @csrf
                                </form>

                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </div>
    </div>
</nav>
