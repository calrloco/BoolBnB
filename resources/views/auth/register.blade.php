@extends('layouts.app')

@section('content')
<div class="signup_container">
    <div class="signup">
      <h1>Sign Up for an Account</h1>
      <form method="POST" action="{{ route('register') }}"> 
        @csrf
        <div class="name_inputs">
          <!-- first name -->
          <div>
            <label for="name">First Name</label><br />
            <input type="text" name="name" placeholder="Your first name" class="fname" required />
          </div>

          <!-- last name -->
          <div>
            <label for="lastname">Last Name</label><br />
            <input type="text" name="lastname" placeholder="Your last name" class="lname" required />
          </div>
        </div>

        <!-- email -->
        <div>
          <label for="email">Email</label><br />
          <input type="email" name="email" placeholder="Enter your email" />
        </div>

        <!-- password -->
        <div>
          <label for="password">Password</label><br />
          <div class="password">
            <input type="password" name="password" placeholder="Enter your password" />
          </div>
        </div>

        <div>
          <label for="password-confirm">Confirm Password</label><br />
          <div class="password">
            <input type="password" name="password_confirmation" placeholder="Confirm your password" />
          </div>
        </div>

        <!-- Date of birth -->
        <div class="date">
          <label for="birth">Date Of Birth</label><br />
          <div class="password">
            <input type="date" name="date_of_birth" placeholder="Confirm your password" />
          </div>
        </div>
        <button type="submit" class="signup_btn">{{ __('Register') }}</button>
      </form>

       <!-- Social icons -->
      <p class="or_else">Or Sign up using</p>
      <div class="social_logins">
        <button type="submit" class="google_login">
          <i class="fab fa-google"></i>
        </button>
        <button type="submit" class="facebook_login">
          <i class="fab fa-facebook-f"></i>
        </button>
        <button type="submit" class="linkedin_login">
          <i class="fab fa-linkedin-in"></i>
        </button>
      </div>
    </div>
  </div>
@endsection
