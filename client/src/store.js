import React from "react";

export const initialState = {
  collapsed: true,
  item: {},
  token: "",
  nonce: "",
  status: "",
  id: ""
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "collapse":
      return { ...state, collapsed: !state.collapsed };
    case "addItem":
      return {
        ...state,
        item: action.item
      };
    case "storeToken":
      return {
        ...state,
        token: action.token
      };
    case "storePaymentInfo":
      return {
        ...state,
        id: action.id,
        status: action.status
      };
    default:
      return state;
  }
};

/*switch (action.type) {
    case "collapse":
      return { collapsed: !state.collapsed };
    case "addItem":
      return {
        item: action.item,
        collapsed: state.collapsed
      };
    case "storeToken":
      return {
        token: action.token,
        collapsed: state.collapsed,
        item: state.item
      };
    case "storePaymentInfo":
      return {
        id: action.id,
        status: action.status,
        collaped: state.collapsed,
        token: state.token,
        item: state.item
      };
    default:
      return state;
  }*/

export const Context = React.createContext();
