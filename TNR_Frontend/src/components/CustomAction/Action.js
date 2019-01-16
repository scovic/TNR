import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import ActionStyle from "assets/styles/components/actionStyle";

const Action = props => {
  const { classes, label, icon, nohover, ...others } = props;

  const containerStyle = !nohover
    ? classes.actionContainer + " " + classes.hoverActionContainer
    : classes.actionContainer + " " + classes.nohover;
  return (
    <div {...others} className={containerStyle}>
      {icon}
      <span className={classes.actionLabel}>{label}</span>
    </div>
  );
};

Action.defaultProps = {
  nohover: false
};

export default withStyles(ActionStyle)(Action);
