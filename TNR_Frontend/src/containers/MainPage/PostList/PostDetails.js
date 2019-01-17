import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import JwtDecode from "jwt-decode";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import Action from "components/CustomAction/Action";
import Comment from "./Comment";
import { connect } from "react-redux";
import { SIGNEDIN } from "_state/userState";
import {
  upVotePost,
  downVotePost,
  savePost,
  addNewComment,
  getCommentsForPost,
  getRecommended
} from "services/general.service";

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
      comments: [],
      comment: "",
      postInfoState: null,
      recommended: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.savePost = this.savePost.bind(this);
    this.comment = this.comment.bind(this);
  }

  componentDidMount() {
    if (this.props.userState === SIGNEDIN) {
      Promise.all([
        getCommentsForPost({ id: this.props.postInfoProp.id }),
        getRecommended({ title: this.props.postInfoProp.community.name })
      ]).then(resultArray => {
        const comments = this.filterResponse(resultArray[0]);
        const recommendation = this.filterRecommended(resultArray[1]);
        this.setState({
          comments: comments,
          postInfoState: this.props.postInfoProp,
          recommended: recommendation
        });
      });
    } else {
      getCommentsForPost({ id: this.props.postInfoProp.id }).then(res => {
        const comments = this.filterResponse(res);
        this.setState({
          comments: comments,
          postInfoState: this.props.postInfoProp
        });
      });
    }
  }

  filterResponse(comments) {
    return comments.map(comment => {
      const commentInfo = comment._fields;
      const postedBy = {
        id: commentInfo[0].identity.low,
        username: commentInfo[0].properties.username
      };
      const commentDetails = {
        id: commentInfo[1].identity.low,
        content: commentInfo[1].properties.content
      };
      return { postedBy, commentDetails };
    });
  }

  filterRecommended(recommended) {
    return recommended.map(recom => {
      const recommendation = recom._fields[0];

      return {
        id: recommendation.identity.low,
        name: recommendation.properties.title,
        subject: recommendation.properties.subject,
        rules: recommendation.properties.rules
      };
    });
  }

  comment() {
    const token = localStorage.getItem("accToken");
    const decodedToken = JwtDecode(token);
    const username = decodedToken.username;
    const userId = decodedToken.id;
    const localObj = {
      commentDetails: { content: this.state.comment },
      postedBy: {
        username: username,
        id: userId
      }
    };
    const objToSend = {
      comment: { content: this.state.comment },
      post: { id: this.state.postInfoState.id }
    };

    addNewComment(objToSend).then(resp => {
      this.setState({
        comments: [...this.state.comments, localObj],
        comment: ""
      });
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  upvote() {
    if (this.props.userState === SIGNEDIN) {
      let upvotes = this.state.postInfoState.id;
      const post = {
        id: this.state.postInfoState.id
      };
      upVotePost(post).then(res => this.setState({ upvotes: ++upvotes }));
    }
  }

  downvote() {
    if (this.props.userState === SIGNEDIN) {
      let upvotes = this.state.postInfoState.id;
      const post = {
        id: this.state.postInfoState.id
      };
      downVotePost(post).then(res => this.setState({ upvotes: --upvotes }));
    }
  }

  savePost() {
    if (this.props.userState === SIGNEDIN) {
      savePost(this.state.postInfoState.id);
    }
  }

  render() {
    const { classes, handleClose, postInfoProp } = this.props;
    const { postInfoState } = this.state;
    const postInfo = postInfoState || postInfoProp;
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
          onClick={this.upvote}
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
          onClick={this.downvote}
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
            this.state.comments.length > 0
              ? `${this.state.comments.length} Comments`
              : "Comment"
          }
        />
        <Action
          onClick={this.savePost}
          icon={<BookmarkIcon className={classes.actionIcon} />}
          label="Save"
        />
      </div>
    );

    const recomemenedComunities = (
      <React.Fragment>
        <h3>Communities we recommend for you:</h3>
        <ul className={classes.communityList}>
          {this.state.recommended.length > 0 ? (
            this.state.recommended.map((recom, index) => (
              <li
                key={index}
                className={
                  classes.communityName +
                  " " +
                  classes.hover +
                  " " +
                  classes.listItem
                }
              >
                {recom.name}
              </li>
            ))
          ) : (
            <h3>Searching...</h3>
          )}
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
                {this.props.userState === SIGNEDIN ? (
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
                      onClick={this.comment}
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
                ) : (
                  <div>You need to sign in to comment</div>
                )}
                <div className={classes.commentSection}>
                  {this.state.comments.length > 0 ? (
                    this.state.comments.map((comment, index) => (
                      <Comment
                        key={index}
                        postedBy={comment.postedBy}
                        content={comment.commentDetails.content}
                      />
                    ))
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

function mapStateToProps(state) {
  return {
    userState: state.userState.state
  };
}

const Connected = connect(mapStateToProps)(PostDetails);

export default withStyles(PostDetailsStyle)(Connected);
