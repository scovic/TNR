import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import Action from "components/CustomAction/Action";
import Comment from "./Comment";

import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import MessageIcon from "@material-ui/icons/Message";
import ClearIcon from "@material-ui/icons/Clear";
import ArrowUpIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownIcon from "@material-ui/icons/ArrowDownward";
import CommentsIcon from "@material-ui/icons/Forum";
import BookmarkIcon from "@material-ui/icons/Bookmark";

import PostDetailsStyle from "assets/styles/containers/FirstPage/postDetailsStyle";

class PostDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { classes, handleClose, postInfo } = this.props;

    const upvotesToShow =
      postInfo.upvotes > 999
        ? `${(postInfo.upvotes / 1000).toFixed(1)}k`
        : postInfo.upvotes;

    const header = (
      <GridContainer className={classes.header} justify="space-between">
        <span className={classes.padLeft}>
          <MessageIcon style={{ marginBottom: -6, paddingRight: 6 }} />
          <span className={classes.headerTitle}>{postInfo.title}</span>
        </span>
        <span className={classes.padRight}>
          <IconButton
            onClick={handleClose}
            classes={{ root: classes.closeIcon }}
          >
            <ClearIcon fontSize="small" /> Close
          </IconButton>
        </span>
      </GridContainer>
    );

    const upvotesSection = (
      <React.Fragment>
        <IconButton
          classes={{
            root: classes.primaryIconButton
          }}
        >
          <ArrowUpIcon style={{ fontSize: 16 }} />
        </IconButton>
        <div className={classes.upvoteContainer}>
          <span className={classes.upvoteNumber}>{upvotesToShow}</span>
        </div>
        <IconButton
          classes={{
            root: classes.secondaryIconButton
          }}
        >
          <ArrowDownIcon style={{ fontSize: 16 }} />
        </IconButton>
      </React.Fragment>
    );

    const textContent = (
      <React.Fragment>
        <div className={classes.titleContainer}>
          <span className={classes.textTitle}>{postInfo.title}</span>
        </div>
        <div className={classes.textContainer}>
          <span>{postInfo.content}</span>
        </div>
      </React.Fragment>
    );

    const actions = (
      <div className={classes.actionsContainer}>
        <Action
          nohover={true}
          icon={<CommentsIcon className={classes.actionIcon} />}
          label={
            postInfo.comments.length > 0
              ? `${postInfo.comments.length} Comments`
              : "Comment"
          }
        />
        <Action
          icon={<BookmarkIcon className={classes.actionIcon} />}
          label="Save"
        />
      </div>
    );

    const recomemenedComunities = (
      <React.Fragment>
        <h3>Communities we recommend for you:</h3>
        <ul className={classes.communityList}>
          <li
            className={
              classes.communityName +
              " " +
              classes.hover +
              " " +
              classes.listItem
            }
          >
            one
          </li>
          <li
            className={
              classes.communityName +
              " " +
              classes.hover +
              " " +
              classes.listItem
            }
          >
            two
          </li>
        </ul>
      </React.Fragment>
    );

    return (
      <GridContainer>
        <GridItem xs={12}>{header}</GridItem>
        <GridItem xs={8}>
          <Card>
            <GridContainer>
              <GridItem className={classes.upvotesSection} xs={2}>
                {upvotesSection}
              </GridItem>
              <GridItem className={classes.contentSection} xs={10}>
                <div className={classes.opInfo}>
                  <span className={classes.communityName + " " + classes.hover}>
                    {postInfo.community.name}
                  </span>
                  <span> - Posted by </span>
                  <span className={classes.hover}>
                    {postInfo.postedBy.username}
                  </span>
                </div>
                {textContent}
                {actions}
                <div className={classes.comments}>
                  Comments
                  <br />
                  <TextField
                    value={this.state.comment}
                    name="comment"
                    multiline
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    onChange={this.handleChange}
                    rows={5}
                  />
                  <br />
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    children="Comment"
                    classes={{
                      root: classes.buttonOver,
                      containedPrimary: classes.buttonColorPrimary
                    }}
                  />
                </div>
                <div className={classes.commentSection}>
                  {postInfo.comments.length > 0 ? (
                    <h2>comments</h2>
                  ) : (
                    <h2>There are no comments for this post!</h2>
                  )}
                </div>
              </GridItem>
            </GridContainer>
          </Card>
        </GridItem>
        <GridItem xs={4}>
          <Card>{recomemenedComunities}</Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(PostDetailsStyle)(PostDetails);
