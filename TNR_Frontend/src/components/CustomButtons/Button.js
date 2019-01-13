import React from "react";
import withStyle from "@material-ui/core/styles/withStyles";
import MButton from "@material-ui/core/Button";

import ButtonStyle from "../../assets/styles/components/buttonStyle";

const Button = function(props) {
  const { classes, children, ...other } = props;
  return (
    <MButton
      {...other}
      className={classes.button}
      classes={{
        root: classes.buttonRoot,
        containedPrimary: classes.buttonColorPrimary
      }}
    >
      {children}
    </MButton>
  );
};

export default withStyle(ButtonStyle)(Button);
