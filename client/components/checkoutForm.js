// CheckoutForm.js
import React from 'react';
import {injectStripe} from 'react-stripe-elements';

// import AddressSection from './AddressSection';
import CardSection from './cardSection';

class CheckoutForm extends React.Component {
  handleSubmit = (ev) => {
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      console.log('Received Stripe token:', token);
    });

    // However, this line of code will do the same thing:
    //
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

    // You can also use createSource to create Sources. See our Sources
    // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
    //
    // this.props.stripe.createSource({type: 'card', name: 'Jenny Rosen'});
  };

  render() {
    console.log("line 30 in checkoutForm this.props.stripe",this.props.stripe);
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button type="submit">Confirm order</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
