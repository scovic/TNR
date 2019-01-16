import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

import Post from "../PostList/Post";

import Select from "./Select";
import AddNewPost from "./AddNewPost";

import UserProfileStyle from "assets/styles/containers/UserProfile/userProfileStyle";

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

const Categories = [
  "overview",
  "posts",
  "comments",
  "upvoted",
  "downvoted",
  "saved"
];

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewPost: false,
      userInfo: null,
      posts: [],
      category: ""
    };
    this.openPost = this.openPost.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAddNewPost = this.handleAddNewPost.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
  }

  componentDidMount() {
    this.setState({ posts: mockData, category: Categories[0] });
  }

  selectCategory(selectedValue) {
    this.setState({ category: selectedValue });
  }

  openPost(jsonObj) {
    this.props.openPost(jsonObj);
  }

  handleClose() {
    this.setState({ addNewPost: false });
  }

  handleAddNewPost() {
    this.setState({ addNewPost: true });
  }

  render() {
    const { posts, addNewPost, category } = this.state;
    const { classes } = this.props;
    console.log(category);
    return (
      <GridContainer>
        <GridItem xs={8}>
          <Card>
            <Select selectedItem={category} select={this.selectCategory}>
              {Categories.map((category, index) => (
                <MenuItem
                  key={index}
                  classes={{ root: classes.menuItemRoot }}
                  value={category}
                  children={
                    category.charAt(0).toUpperCase() + category.slice(1)
                  }
                />
              ))}
            </Select>
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
              <h4>username</h4>
              <Button
                fullWidth
                variant="contained"
                size="small"
                color="primary"
                children="New Post"
                onClick={this.handleAddNewPost}
                classes={{
                  root: classes.buttonOver,
                  containedPrimary: classes.buttonColorPrimary
                }}
              />
            </CardBody>
          </Card>
        </GridItem>
        <Dialog
          open={addNewPost}
          fullWidth={true}
          maxWidth="sm"
          onClose={this.handleClose}
          scroll="body"
        >
          <DialogContent classes={{ root: classes.dialogPostRoot }}>
            {addNewPost && <AddNewPost />}
          </DialogContent>
        </Dialog>
      </GridContainer>
    );
  }
}

export default withStyles(UserProfileStyle)(UserProfile);
