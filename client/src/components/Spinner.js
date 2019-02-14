import * as React from "react";
//spinner
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  progress: {
    top: "50%",
    left: "50%",
    position: "fixed",
    size: "38px"
  }
});

let Spinner = props => {
  const { classes } = props;
  return (
    <div>
      <CircularProgress className={classes.progress} />
    </div>
  );
};

Spinner.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Spinner);
