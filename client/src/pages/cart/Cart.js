import React, { useContext } from "react";
import { Context } from "../../store";

const Cart = () => {
  const { store, dispatch } = useContext(Context);
  return <h1>Cart</h1>;
};

export default Cart;
