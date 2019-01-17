import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import CommentStyle from "assets/styles/containers/FirstPage/commentStyle";

const Comment = props => {
  const { classes, content, postedBy } = props;

  return (
    <div className={classes.opInfo + " " + classes.commentContainer}>
      <span className={classes.hover + " " + classes.commentOp}>
        {postedBy.username}
      </span>

      <div className={classes.commentContentContainer}>
        <div className={classes.commentContent}>{content}</div>
      </div>
    </div>
  );
};

export default withStyles(CommentStyle)(Comment);
