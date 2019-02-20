import * as React from "react";
import ReactDOM from "react-dom";
/*global paypal*/
class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }

  /* componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://www.paypal.com/sdk/js?client-id=sb";
    script.async = true;

    document.body.appendChild(script);
  }*/

  createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "1.00"
          }
        }
      ]
    });
  }

  onApprove(data, actions) {
    return actions.order.capture().then(response => {
      console.log(response);
    });
  }

  onError(err) {
    return console.error(err);
  }

  render() {
    // eslint-disable-next-line
    let PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

    return (
      // eslint-disable-next-line
      <PayPalButton
        createOrder={(data, actions) => this.createOrder(data, actions)}
        onApprove={(data, actions) => this.onApprove(data, actions)}
        onError={err => this.onError(err)}
      />
    );
  }
}

export default Checkout;
