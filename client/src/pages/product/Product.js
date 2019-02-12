import React, { useState, useReducer, useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import NavigationIcon from "@material-ui/icons/Navigation";
import Chip from "@material-ui/core/Chip";

import { Context, initialState, reducer } from "../../store";

import Cart from "../cart/Cart";

let products = [
  {
    id: 0,
    name: "Jerky 1",
    price: "5.00",
    img: "https://heartbrandbeef.com/wp-content/uploads/2017/05/Jerky-2.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nulla odio, tempor sit amet condimentum ac, maximus sed nisl. Etiam lacus lacus, iaculis eget felis eget"
  },
  {
    id: 1,
    name: "Jerky 2",
    price: "6.99",
    img:
      "https://www.ketovale.com/wp-content/uploads/2018/06/homemade-cajun-beef-jerky.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nulla odio, tempor sit amet condimentum ac, maximus sed nisl. Etiam lacus lacus, iaculis eget felis eget"
  },
  {
    id: 2,
    name: "Jerky 3",
    price: "4.50",
    img:
      "https://www.beefjerkyoutlet.com/sites/default/files/styles/product_catalog/public/2018-01/Original-Smoked-Beef-jerky_catalog.jpg?itok=ydxNczRF",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nulla odio, tempor sit amet condimentum ac, maximus sed nisl. Etiam lacus lacus, iaculis eget felis eget"
  }
];

const styles = theme => ({
  card: {
    maxWidth: 345,
    marginLeft: 10,
    marginRight: 10
  },
  media: {
    height: 160
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  fab: {
    margin: theme.spacing.unit
  },
  chip: {
    justifyContent: "right"
  },
  button: {
    margin: theme.spacing.unit
  }
});

const Product = props => {
  const { store, dispatch } = useContext(Context);
  //const [store, dispatch] = useReducer(reducer, initialState);
  const { classes } = props;

  const [item, setItem] = useState({
    name: "",
    price: "",
    description: ""
  });
  // maps through the products array and creates UI
  let displayProducts = products.map(data => {
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media} image={data.img} title="Jerky" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.name}
            </Typography>
            <Typography component="p">{data.description}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Fab color="primary" aria-label="Add" className="classes.fab">
            <AddIcon
              onClick={() =>
                setItem({
                  name: data.name,
                  price: data.price,
                  description: data.description
                })
              }
            />
          </Fab>
          <Chip
            label={data.price}
            className={classes.chip}
            variant="outlined"
          />
        </CardActions>
      </Card>
    );
  });

  const CartLink = () => {
    return (
      <Link
        to={{
          pathname: "/cart",
          state: { item: item }
        }}
      />
    );
  };

  //displays button to go to cart, uses react-router-dom Link. need to pass state here
  let displayPay = () => {
    let location = {
      pathname: "/cart",
      state: { item: item }
    };

    if (Object.keys(item.name).length > 0) {
      return (
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          component={Link}
          to="/cart"
          state={item}
          onClick={() => dispatch({ type: "addItem", item: item })}
        >
          {item.name} for ${item.price} added to cart
        </Button>
      );
    }
  };
  return (
    <Container>
      <Row>
        <Col className="mt-5">
          <h2>Beef Jerky</h2>
        </Col>
        {displayPay()}
        <Row className="mt-5">{displayProducts}</Row>
        <div />
      </Row>
    </Container>
  );
};

Product.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Product);
