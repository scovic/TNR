import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import CommentStyle from "assets/styles/containers/FirstPage/commentStyle";

const Comment = props => {
  const { classes, content, op } = props;

  return (
    <div className={classes.opInfo + " " + classes.commentContainer}>
      <span className={classes.hover + " " + classes.commentOp}>{op}</span>

      <div className={classes.commentContentContainer}>
        <div className={classes.commentContent}>{content}</div>
      </div>
    </div>
  );
};

export default withStyles(CommentStyle)(Comment);
