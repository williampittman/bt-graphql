import React from "react";
import Component from "react-dom";
import PayPalButton from "react-paypal-button";

export default class PayPal extends React.Component {
  render() {
    return (
      <PayPalButton
        env="sandbox"
        sandboxID="Af_OpabuECsNfU6AzLf1PT213b3BGAy6CRJa5IEr3hteYlOFobgeo0D9gTXxgH4l4UjyhJplVW2xaGVO"
        amount="0.01"
        currency="USD"
        commit={true}
      />
    );
  }
}
