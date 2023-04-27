import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import  total from './CartTotal';

const stripePromise = loadStripe('pk_test_51N1aHXFePaFhX4ZUkO4i9sIFBdFNwhj52yaoLQim4jQ1I8ecwGjerP5VzcDXMQolgWRPN7rTRZ0u5fX10yMrbv4f00iJdLdLHE');

const CheckoutForm = () => {
  const [price, setPrice] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const stripe = await stripePromise;

    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ total }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Price:
        <input
          type="text"
          value={total}
        
        />
      </label>
      <button type="submit">Checkout</button>
    </form>
  );
};

export default CheckoutForm;