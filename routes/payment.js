const express = require("express");
const router = express.Router();
const request = require("request-promise");

const creds = require("../bt-config");

router.post("/execute_payment", (req, res) => {
  const nonce = req.body.nonce;
  console.log(nonce);
  let mutation = `{
    "query": "mutation chargePaymentMethod($input: ChargePaymentMethodInput!) {chargePaymentMethod(input: $input) {transaction {idstatus}}}",
    "variables": {
      "input": {
        "paymentMethodId": "${nonce}",
        "transaction": {
          "amount": "11.23"
        }
      }
    }
  }`;

  let payment = {
    submit: function() {
      return request({
        method: "POST",
        uri: "https://payments.sandbox.braintree-api.com/graphql",
        json: false,
        headers: {
          Authorization: `Basic ${creds.basic}`,
          "Content-Type": "application/json",
          "Braintree-Version": "2019-01-01"
        },
        body: mutation
      });
    }
  };

  const completePayment = () => {
    return payment
      .submit()
      .then(response => res.send(response))
      .catch(err => res.send(err));
  };

  completePayment();
});

module.exports = router;
