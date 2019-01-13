import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import ActionStyle from "assets/styles/components/actionStyle";

const Action = props => {
  const { classes, label, icon, ...others } = props;
  return (
    <div
      {...others}
      className={classes.actionContainer + " " + classes.hoverActionContainer}
    >
      {icon}
      <span className={classes.actionLabel}>{label}</span>
    </div>
  );
};

export default withStyles(ActionStyle)(Action);
