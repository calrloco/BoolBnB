@extends('layouts.app')

@section('content')
  <div class="container-center">
    <div class="wrapper">
  <div class="left">
    <div class="front">
      <div class="sectionWrap">
        <h1>Boolbnb </h1>
        <hr>
        <p class="preview">Ciao {{ Auth::user()->name }}! Sponsorizza il tuo appartamento e fai in modo che lo vedano più persone!!</p>
        <button class="openB"><p>Scegli il piano...</p></button>
      </div>
    </div>
    <div class="back">
      <div class="sectionWrap">
      <h1>Basic</h1>
        <hr>
        <input type="radio" name="sponsor" id="sponsorBasic" value="2.99" checked>
        <p class="sponsorizza">Prezzo: 2,99€ </p>
        <p class="sponsorizza">Tempo: 24 ore di sponsorizzazione</p>
      </div>
    </div>
  </div>
  <div class="middle">
    <div class="sectionWrap">
      <h1>Medium</h1>
        <hr>
        <input type="radio" name="sponsor" id="sponsorMedium" value="5.99">
        <p class="sponsorizza">Prezzo: 5,99€ </p>
        <p class="sponsorizza">Tempo: 72 ore di sponsorizzazione</p>
        <button class="pay"><p>Procedi per il pagamento...</p></button>
    </div>
  </div>
  <div class="right">
      <div class="sectionWrap">
      <h1>Premium</h1>
        <hr>
        <input type="radio" name="sponsor" id="sponsorPremium" value="9.99">
         <p class="sponsorizza">Prezzo: 9,99€ </p>
        <p class="sponsorizza">Tempo: 144 ore di sponsorizzazione</p>
      </div>
    <button class="closeB">✕</button>
  </div>
</div>

<div class="form-container">
  <div class="payment-checkout checkout">
		<form method="post" id="payment-form" class="payment-checkout-form container" action="{{  route('logged.checkout',$apartment->id) }}"">
			@csrf
			@method('post')
			<section>
				<label for="amount">
						<div class="input-wrapper amount-wrapper">
							<input id="amount" name="amount" type="tel" min="1" placeholder="Amount" value="" style="display:none">
						</div>
				</label>
				<div class="bt-drop-in-wrapper">
					<div id="bt-dropin"></div>
				</div>
			</section>
			
			<input id="client_token" name="token" type="hidden" value="{{ $token }}"/>
			<input id="nonce" name="payment_method_nonce" type="hidden" />
			<input id="sponsor_plan" name="sponsor_plan" type="hidden" value="" />
			<button class="btn-succes" type="submit">
				<span>Paga e avvia la sponsorizzazione</span>
			</button>
		</form>
	</div>
</div>
</div>
</div>
    <!-- Load the PayPal Checkout component. -->
<script src="https://js.braintreegateway.com/web/3.38.1/js/paypal-checkout.min.js"></script>
<script src="https://js.braintreegateway.com/web/dropin/1.22.1/js/dropin.min.js"></script>
@endsection
