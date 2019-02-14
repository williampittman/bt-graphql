import React, { useContext, useReducer, useState } from "react";
import PropTypes from "prop-types";
import { Context, reducer, initialState } from "../../store";
import { Container, Col, Row } from "reactstrap";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "reactstrap";
import axios from "axios";

import GetToken from "../../components/GetToken";
import "../../index.css";
import Axios from "axios";
const dropIn = require("braintree-web-drop-in");

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    overflowX: "auto"
  },
  table: {},
  text: {
    noWrap: false,
    textOverFlow: "ellipsis",
    overflow: "hidden",
    maxWidth: "100%"
  },
  button: {
    visibility: "hidden"
  }
});

const Cart = props => {
  const { store, dispatch } = useContext(Context);
  const { classes } = props;
  const [show, setShow] = useState(false);

  let showState = () => {
    console.log(store);
  };
  let i = 0;

  let showButton;

  /*let showSubmitButton = () => {
    return (
      <Button color="secondary" size="lg" block id="submit-button">
        Submit Payment
      </Button>
    );
  };*/

  let setUpDropIn = () => {
    if (store.token != "") {
      dropIn.create(
        {
          authorization: store.token,
          container: "#dropin-container",
          paypal: {
            flow: "checkout",
            buttonStyle: {
              color: "blue",
              shape: "rect",
              size: "medium"
            }
          },
          paypalCredit: {
            flow: "checkout",
            amount: "10.00",
            currency: "USD"
          },
          venmo: {
            allowNewBrowserTab: false
          }
        },
        (createErr, instance) => {
          if (createErr) {
            console.log(createErr);
          } else {
            // showSubmitButton();
            let button = document.querySelector("#submit-button");
            button.addEventListener("click", () => {
              instance.requestPaymentMethod(
                (requestPaymentMethodErr, payload) => {
                  if (requestPaymentMethodErr) {
                    console.log(requestPaymentMethodErr);
                  } else {
                    console.log(`nonce: ${payload.nonce}`);
                    axios
                      .post("/payment/execute_payment", {
                        nonce: payload.nonce
                      })
                      .then(response => {
                        console.log(response);
                        dispatch({
                          type: "storePaymentInfo",
                          id:
                            response.data.data.chargePaymentMethod.transaction
                              .id,
                          status:
                            response.data.data.chargePaymentMethod.transaction
                              .status
                        });
                        return (
                          <div>
                            <Paper className={classes.root} elevation={1}>
                              <Typography variant="h5" component="h3">
                                Payment Successful!
                              </Typography>
                              <Typography component="p">
                                Transaction Id: {store.id}. Status:{" "}
                                {store.status}
                              </Typography>
                            </Paper>
                          </div>
                        );
                      })
                      .catch(err => console.log(err));
                  }
                }
              );
            });
          }
        }
      );
    }
  };

  const showPaymentInfo = () => {
    if (store.id != "" && store.status != "") {
      return (
        <div>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="h5" component="h3">
              Payment Successful!
            </Typography>
            <Typography component="p">
              Transaction Id: {store.id}. Status: {store.status}
            </Typography>
          </Paper>
        </div>
      );
    }
  };

  return (
    <div>
      {showState()}
      <Container>
        <Row className="mt-5">
          <h2>Cart</h2>
        </Row>
        <Row className="mt-5">
          <Col sm="12" md={12}>
            <Paper className={classes.root} elebation={1}>
              <Typography variant="h5" component="h3">
                Items in your cart:
              </Typography>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {store.item.name}
                    </TableCell>
                    <TableCell align="right">{store.item.price}</TableCell>
                    <TableCell align="right">
                      <Typography noWrap className={classes.text}>
                        {store.item.description}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={4}>
            <GetToken />
          </Col>
          <Col md={8}>
            <div id="dropin-container" />
            <div id="button-container" />
            <Button color="secondary" size="lg" block id="submit-button">
              Submit Payment
            </Button>
            {setUpDropIn()}
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>{showPaymentInfo()}</Col>
        </Row>
      </Container>
    </div>
  );
};

Cart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Cart);
