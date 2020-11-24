@extends('layouts.app')

@section('content')
<div class="sponsor_header">
	<h3>Ciao <span class="user">{{ Auth::user()->name }}</span>, sponsorizza il tuo appartamento e fai in modo che lo vedano più persone!</h3>
	<h4>Scegli il tuo piano di sponsorizzazione per il tuo appartamento situato in <span>{{ $apartment->address }}</span> a <span>{{ $apartment->city }}</span></h4>
</div>
	
<div class="cards_container">
	<div class="pay-card">
		<h5>Basic</h5>
		<span>2,99 € per 24 ore di sponsorizzazione</span>
		<input type="radio" name="sponsor" id="sponsorBasic" value="2.99" checked>
	</div>
	<div class="pay-card">
		<h5>Medium</h5>
		<span>5.99 € per 72 ore di sponsorizzazione</span>
		<input type="radio" name="sponsor" id="sponsorMedium" value="5.99">
	</div>
	<div class="pay-card">
		<h5>Premium</h5>
		<span>9.99 € per 144 ore di sponsorizzazione</span>
		<input type="radio" name="sponsor" id="sponsorPremium" value="9.99">
	</div>
	<div class="payment-checkout checkout">
		<form method="post" id="payment-form" class="payment-checkout-form container" action="{{  route('logged.checkout',$apartment->id) }}"">
			@csrf
			@method('post')
			<section>
				<label for="amount">
						<div class="input-wrapper amount-wrapper">
							<input id="amount" name="amount" type="tel" min="1" placeholder="Amount" value="" style="display:none">
							<h1 id="amount_preview" class="mt-4">€ 2.99</h1>
						</div>
				</label>
				<div class="bt-drop-in-wrapper">
					<div id="bt-dropin"></div>
				</div>
			</section>
			
			<input id="client_token" name="token" type="hidden" value="{{ $token }}"/>
			<input id="nonce" name="payment_method_nonce" type="hidden" />
			<input id="sponsor_plan" name="sponsor_plan" type="hidden" value="" />
			<button class="btn btn-success btn-pay" type="submit">
				<span>Paga e avvia la sponsorizzazione</span>
			</button>
		</form>
	</div>
</div>
 <script src="https://www.paypalobjects.com/api/checkout.js" data-version-4 log-level="warn"></script>

    <!-- Load the PayPal Checkout component. -->
    <script src="https://js.braintreegateway.com/web/3.38.1/js/paypal-checkout.min.js"></script>
<script src="https://www.paypal.com/sdk/js?client-id=your-sandbox-or-prod-client-id&vault=true"></script>
<script src="https://js.braintreegateway.com/web/dropin/1.22.1/js/dropin.min.js"></script>
<script src="{{ asset('js/braintree/pay.js') }}"></script>
@endsection
