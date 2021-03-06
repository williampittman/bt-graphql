import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import { Context, initialState, reducer } from "./store";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import * as serviceWorker from "./serviceWorker";

import Spinner from "./components/Spinner";

const Product = React.lazy(() => import("./pages/product/Product"));
const Cart = React.lazy(() => import("./pages/cart/Cart"));

const Root = () => {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ store, dispatch }}>
      <div>
        <Navbar color="dark" className="navbar-dark bg-dark">
          <NavbarBrand href="/" className="mr-auto">
            Braintree GraphQL APIs
          </NavbarBrand>
          <NavbarToggler onClick={() => dispatch({ type: "collapse" })} />
          <Collapse isOpen={!store.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/cart">Cart</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <React.Suspense fallback={<Spinner />}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={() => <Product />} />
              <Route name="cart" path="/cart" component={() => <Cart />} />
            </Switch>
          </BrowserRouter>
        </React.Suspense>
      </div>
    </Context.Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
