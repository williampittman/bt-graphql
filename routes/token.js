const express = require("express");
const router = express.Router();
const request = require("request-promise");

const creds = require("../bt-config");

router.post("/getToken", (req, res) => {
  let mutation = `{
    "query": "mutation CreateClientTokenPayload($input: CreateClientTokenInput) {createClientToken(input: $input) {clientToken}}",
    "variables": {
        "input": {
            "clientToken": {
                "merchantAccountId": "${creds.merchantAccountId}"
            }
        }
    }
}`;

  let bt_init = {
    getToken: function() {
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

  const tokenRequest = () => {
    bt_init
      .getToken()
      .then(response => res.send(response))
      .catch(err => console.log(err));
  };

  tokenRequest();
});

module.exports = router;
