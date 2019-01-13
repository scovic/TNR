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

const mockText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at lorem scelerisque, rhoncus purus sed, sollicitudin dui. Duis efficitur, lorem auctor sodales scelerisque, sapien libero fermentum lacus, sed aliquet neque enim in lectus. Duis purus risus, vestibulum vel lectus a, vulputate vestibulum quam. Quisque in vehicula magna. Aliquam fringilla rhoncus tortor in pulvinar. Etiam efficitur urna eget urna dignissim placerat. Morbi ut convallis odio. In vehicula justo in leo pellentesque gravida. Quisque mi nunc, dictum vel aliquam eu, convallis sed nisl.";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 3123,
      upvotes: 16.5,
      title: "Not much time left",
      contentType: "text",
      content: mockText
    };
  }
  render() {
    const { classes } = this.props;
    const { upvotes, content, title } = this.state;

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
          <span className={classes.upvoteNumber}>{upvotes}k</span>
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
          label="123 Comments"
        />
        <Action
          icon={<BookmarkIcon className={classes.actionIcon} />}
          label="Save"
        />
      </div>
    );

    return (
      <Card>
        <GridContainer>
          <GridItem className={classes.upvotesSection} xs={2}>
            {upvotesSection}
          </GridItem>
          <GridItem className={classes.contentSection} xs={10}>
            <div className={classes.opInfo}>
              <span className={classes.communityName + " " + classes.hover}>
                community
              </span>
              <span> - Posted by </span>
              <span className={classes.hover}>OP name</span>
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
