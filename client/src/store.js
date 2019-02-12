import React from "react";

export const initialState = {
  collapsed: true,
  item: {}
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "collapse":
      return { collapsed: !state.collapsed };
    case "addItem":
      return { item: action.item, collapsed: state.collapsed };
    default:
      return state;
  }
};

export const Context = React.createContext();
