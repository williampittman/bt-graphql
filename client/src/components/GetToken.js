import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import axios from "axios";
import { Context } from "../store";

const styles = theme => ({
  button: {
    width: "100%"
  },
  input: {
    display: "none"
  }
});

const GetToken = props => {
  const { store, dispatch } = useContext(Context);
  const [token, setToken] = useState("");
  const { classes } = props;

  let tokenRequest = () => {
    axios.post("/token/getToken").then(response => {
      console.log(response);
      setToken(response.data.data.createClientToken.clientToken);
    });
  };

  let storeToken = () => {
    if (token.length > 0) {
      dispatch({ type: "storeToken", token: token });
      console.log(store);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={tokenRequest}
      >
        {}
        Proceed to Payment
      </Button>
      {storeToken()}
    </div>
  );
};

GetToken.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GetToken);
