import React from "react";

export const initialState = {
  collapsed: true
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "collapse":
      return { collapsed: !state.collapsed };

    default:
      return state;
  }
};

export const Context = React.createContext();
