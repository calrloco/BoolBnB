@extends('layouts.app')

@section('content')
<div class="signup_container">
    <div class="signup login">
      <h1>Login</h1>
      <form method="POST" action="{{ route('login') }}"> 
        @csrf

        <!-- email -->
        <div>
          <label for="email">Email</label><br />
          <input type="email" name="email" placeholder="Enter your email"/>
        </div>

        <!-- password -->
        <div>
          <label for="password">Password</label><br />
          <div class="password">
            <input type="password" name="password" placeholder="Enter your password" />
          </div>
        </div>

        <!-- Remember -->
        <div>
          <input name="remember" type="checkbox" class="checkbox" />
          <span>
            Remember Me
          </span>
        </div>

       <div>
            <button type="submit" class="signup_btn">{{ __('Login') }}</button>
          @if (Route::has('password.request'))
                <a class="forgot_password" href="{{ route('password.request') }}">
                    {{ __('Forgot Your Password?') }}
                </a>
            @endif
       </div>
      </form>
    </div>
  </div>
@endsection
