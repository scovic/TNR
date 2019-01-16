import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Card from "components/Card/Card";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Action from "components/CustomAction/Action";

import IconButton from "@material-ui/core/IconButton";

import ArrowUpIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownIcon from "@material-ui/icons/ArrowDownward";
import CommentsIcon from "@material-ui/icons/Forum";
import BookmarkIcon from "@material-ui/icons/Bookmark";

import PostStyle from "assets/styles/containers/FirstPage/postStyle";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      upvotes: 0,
      title: "",
      contentType: "",
      content: "",
      comments: [],
      community: { name: "test", id: 2 },
      postedBy: { username: "test", id: 2 }
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const {
      title,
      upvotes,
      content,
      contentType,
      id,
      comments,
      community,
      postedBy
    } = this.props;

    this.setState({
      title,
      upvotes,
      content,
      contentType,
      id,
      comments,
      community,
      postedBy
    });
  }

  handleClick() {
    const {
      title,
      upvotes,
      content,
      contentType,
      id,
      comments,
      community,
      postedBy
    } = this.state;

    const { openPost } = this.props;

    const postDetails = {
      title,
      upvotes,
      content,
      contentType,
      id,
      comments,
      community,
      postedBy
    };

    openPost(postDetails);
  }

  render() {
    const {
      title,
      upvotes,
      content,
      comments,
      community,
      postedBy
    } = this.state;
    const { classes } = this.props;

    const upvotesToShow =
      upvotes > 999 ? `${(upvotes / 1000).toFixed(1)}k` : upvotes;

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
          <span className={classes.textTitle}>{title}</span>
        </div>
        <div className={classes.textContainer}>
          <span>{content}</span>
        </div>
      </React.Fragment>
    );

    const actions = (
      <div className={classes.actionsContainer}>
        <Action
          icon={<CommentsIcon className={classes.actionIcon} />}
          label={
            comments.length > 0 ? `${comments.length} Comments` : "Comment"
          }
        />
        <Action
          icon={<BookmarkIcon className={classes.actionIcon} />}
          label="Save"
        />
      </div>
    );

    return (
      <Card className={classes.onePost} onClick={this.handleClick}>
        <GridContainer>
          <GridItem className={classes.upvotesSection} xs={2}>
            {upvotesSection}
          </GridItem>
          <GridItem className={classes.contentSection} xs={10}>
            <div className={classes.opInfo}>
              <span className={classes.communityName + " " + classes.hover}>
                {community.name}
              </span>
              <span> - Posted by </span>
              <span className={classes.hover}>{postedBy.username}</span>
            </div>
            {textContent}
            {actions}
          </GridItem>
        </GridContainer>
      </Card>
    );
  }
}

export default withStyles(PostStyle)(Post);
