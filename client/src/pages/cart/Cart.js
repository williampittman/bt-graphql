import React, { useContext, useReducer } from "react";
import { Context, reducer, initialState } from "../../store";
import { Container, Col, Row } from "reactstrap";

const Cart = props => {
  const { store, dispatch } = useContext(Context);

  let showState = () => {
    console.log(store);
  };
  return (
    <div>
      <Container>
        <Row className="mt-5">
          <h2>Cart</h2>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
