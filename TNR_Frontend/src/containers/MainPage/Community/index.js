import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import Post from "../PostList/Post";
import AddNewCommunity from "./AddNewCommunity";

import CommunityStyle from "assets/styles/containers/Community/communityStyle";

const mockData = [
  {
    id: 1,
    contentType: "text",
    title: "post 1",
    content: "This is some content, and so good so far,",
    upvotes: 132,
    comments: [],
    community: {
      id: 124,
      name: "someCommunity"
    },
    postedBy: {
      id: 12,
      username: "crazyHorSe"
    }
  },
  {
    id: 2,
    contentType: "text",
    title: "post 2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur et odio tempor pulvinar. Vivamus lobortis lacinia dui sed facilisis.",
    upvotes: 1004,
    comments: [],
    community: {
      id: 53,
      name: "askLinux"
    },
    postedBy: {
      id: 12,
      username: "icantc#"
    }
  },
  {
    id: 3,
    contentType: "text",
    title: "post 3",
    content:
      " Vestibulum rhoncus augue a tortor accumsan finibus. Nullam elementum lectus vel arcu rutrum eleifend. Phasellus dictum sed risus sit amet luctus.",
    upvotes: 12,
    comments: [],
    community: {
      id: 15,
      name: "something"
    },
    postedBy: {
      id: 9,
      username: "popstickle"
    }
  }
];

const subscribed = false;

class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewCommunity: false,
      posts: []
    };
    this.handleAddNewCommunity = this.handleAddNewCommunity.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.openPost = this.openPost.bind(this);
  }

  componentDidMount() {
    this.setState({ posts: mockData });
  }

  handleAddNewCommunity() {
    this.setState({ addNewCommunity: true });
  }

  handleClose() {
    this.setState({ addNewCommunity: false });
  }

  openPost(jsonObj) {
    this.props.openPost(jsonObj);
  }

  render() {
    const { posts, addNewCommunity } = this.state;
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={8}>
          <Card>
            <h2>Community Name</h2>
          </Card>
          {posts.length === 0 ? (
            <h2>No posts</h2>
          ) : (
            posts.map(post => (
              <Post
                openPost={this.openPost}
                key={post.id}
                id={post.id}
                upvotes={post.upvotes}
                title={post.title}
                contentType={post.contentType}
                content={post.content}
                comments={post.comments}
                community={post.community}
                postedBy={post.postedBy}
              />
            ))
          )}
        </GridItem>
        <GridItem xs={4}>
          <Card>
            <CardBody>
              <h3>community name</h3>
              <Button
                fullWidth
                variant={subscribed ? "outlined" : "contained"}
                size="small"
                color="primary"
                children={subscribed ? "Unsubscribe" : "Subscribe"}
                classes={{
                  root: classes.buttonOver,
                  containedPrimary: subscribed
                    ? classes.buttonOutlinedColorPrimary
                    : classes.buttonColorPrimary
                }}
              />
              <div style={{ marginTop: 6 }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="small"
                  color="primary"
                  children="Add New Community?"
                  onClick={this.handleAddNewCommunity}
                  classes={{
                    root: classes.buttonOver,
                    containedPrimary: classes.buttonColorPrimary
                  }}
                />
              </div>
            </CardBody>
          </Card>
        </GridItem>
        <Dialog
          open={addNewCommunity}
          fullWidth={true}
          maxWidth="sm"
          onClose={this.handleClose}
          scroll="body"
        >
          <DialogContent classes={{ root: classes.dialogPostRoot }}>
            {addNewCommunity && <AddNewCommunity />}
          </DialogContent>
        </Dialog>
      </GridContainer>
    );
  }
}

export default withStyles(CommunityStyle)(Community);
