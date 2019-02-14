import React from "react";

export const initialState = {
  collapsed: true,
  item: {},
  token: "",
  nonce: ""
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "collapse":
      return { collapsed: !state.collapsed };
    case "addItem":
      return { item: action.item, collapsed: state.collapsed };
    case "storeToken":
      return {
        token: action.token,
        collapsed: state.collapsed,
        item: state.item
      };
    case "storeNonce":
      return { nonce: action.nonce, ...initialState };
    default:
      return state;
  }
};

export const Context = React.createContext();
