import React, { useContext } from "react";
import { Context } from "../store";

const Counter = () => {
  const { store, dispatch } = useContext(Context);
  return (
    <div>
      <p>You clicked {store.count} times</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>reset</button>
    </div>
  );
};

export default Counter;
