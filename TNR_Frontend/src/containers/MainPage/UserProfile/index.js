import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import { connect } from "react-redux";
import { SIGNEDIN } from "_state/userState";
import JwtDecode from "jwt-decode";
import {
  getUserOverview,
  getUserPublishedPosts,
  getUserUpvotedPosts,
  getUserDownvotedPosts,
  getUserSavedPosts,
  getUserCommentedPosts
} from "services/general.service";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

import Post from "../PostList/Post";

import Select from "./Select";
import AddNewPost from "./AddNewPost";

import UserProfileStyle from "assets/styles/containers/UserProfile/userProfileStyle";

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
      category: Categories[0],
      username: JwtDecode(localStorage.getItem("accToken")).username
    };
    this.openPost = this.openPost.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAddNewPost = this.handleAddNewPost.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
  }

  componentDidMount() {
    // getUserOverview().then(res => {
    //   const posts = this.filterPosts(res);
    //   const noDuplicates = this.filteroutDuplicates(posts);
    //   this.setState({ posts: noDuplicates });
    // });
  }

  filteroutDuplicates(posts) {
    const helperSet = Array();
    console.log(posts);
    try {
      if (!posts || posts === undefined) {
        return [];
      }
      const setOfPosts = posts.map(post => {
        if (post.post !== undefined && helperSet.indexOf(post.post.id) === -1) {
          helperSet.push(post.post.id);
          return post;
        }
      });
      const postArray = setOfPosts.filter(post => post !== undefined);
      return postArray;
    } catch (err) {
      console.error(err);
    }
  }

  filterPosts(receivedPosts) {
    console.log(receivedPosts);
    try {
      if (Array.isArray(receivedPosts)) {
        return receivedPosts.map(post => {
          if (post.records.length && post.records.length > 0) {
            const postInfo = post.records[0]._fields;
            const postedBy = {
              id: postInfo[0].identity.low,
              username: postInfo[0].properties.username
            };
            const postDetails = {
              id: postInfo[1].identity.low,
              title: postInfo[1].properties.title,
              content: postInfo[1].properties.text
              // upvotes: postInfo[3].low
            };
            const community = {
              id: postInfo[2].identity.low,
              name: postInfo[2].properties.title
            };
            return {
              postedBy: postedBy,
              post: postDetails,
              community: community
            };
          } else {
            return {};
          }
        });
      } else {
        return [];
      }
    } catch (err) {
      console.error(err);
    }
  }

  selectCategory(selectedValue) {
    switch (selectedValue) {
      case "overview": {
        getUserOverview().then(res => {
          const posts = this.filterPosts(res);
          const noDuplicates = this.filteroutDuplicates(posts);
          this.setState({ posts: noDuplicates, category: selectedValue });
        });
        break;
      }
      case "posts": {
        getUserPublishedPosts().then(res => {
          const posts = this.filterPosts(res);
          const noDuplicates = this.filteroutDuplicates(posts);
          this.setState({ posts: noDuplicates, category: selectedValue });
        });

        break;
      }
      case "comments": {
        getUserCommentedPosts().then(res => {
          const posts = this.filterPosts(res);
          const noDuplicates = this.filteroutDuplicates(posts);
          this.setState({ posts: noDuplicates, category: selectedValue });
        });
        break;
      }
      case "upvoted": {
        getUserUpvotedPosts().then(res => {
          console.log(res);
          const posts = this.filterPosts(res);
          console.log(posts)
          const noDuplicates = this.filteroutDuplicates(posts);
          this.setState({ posts: noDuplicates, category: selectedValue });
        });
        break;
      }
      case "downvoted": {
        getUserDownvotedPosts().then(res => {
          const posts = this.filterPosts(res);
          const noDuplicates = this.filteroutDuplicates(posts);
          this.setState({ posts: noDuplicates, category: selectedValue });
        });
        break;
      }
      case "saved": {
        getUserSavedPosts().then(res => {
          const posts = this.filterPosts(res);
          const noDuplicates = this.filteroutDuplicates(posts);
          this.setState({ posts: noDuplicates, category: selectedValue });
        });
        break;
      }
      default:
        break;
    }

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
          {posts.length === 0 || posts === undefined ? (
            <h2>No posts</h2>
          ) : (
            posts.map((post, index) => (
              <Post
                openPost={this.openPost}
                key={post.post.id}
                id={post.post.id}
                upvotes={post.post.upvotes}
                title={post.post.title}
                contentType={"text"}
                content={post.post.content}
                comments={[]}
                community={post.community}
                postedBy={post.postedBy}
              />
            ))
          )}
        </GridItem>
        <GridItem xs={4}>
          <Card>
            <CardBody>
              <h4>{this.state.username}</h4>
              {this.props.userState === SIGNEDIN && (
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
              )}
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
            {addNewPost && <AddNewPost handleClose={this.handleClose} />}
          </DialogContent>
        </Dialog>
      </GridContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    userState: state.userState.state
  };
}

const Connected = connect(mapStateToProps)(UserProfile);

export default withStyles(UserProfileStyle)(Connected);
