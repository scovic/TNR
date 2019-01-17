import React from "react";
import { Route, Switch } from "react-router";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  getPopularPage,
  getAllPage,
  getHomePage
} from "services/general.service";
import { SIGNEDIN } from "_state/userState";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import Navbar from "./Navbar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";
import Community from "./Community";

import PostList from "./PostList";
import PostDetails from "./PostList/PostDetails";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import MainPageStyle from "assets/styles/containers/FirstPage/mainPageStyle";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: false,
      signUp: false,
      showPost: false,
      postDetails: null,
      category: "Popular",
      posts: []
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleSignUpOpen = this.handleSignUpOpen.bind(this);
    this.handleSignInOpen = this.handleSignInOpen.bind(this);
    this.openPost = this.openPost.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }

  componentDidMount() {
    getPopularPage().then(posts => {
      const postArray = this.filterPosts(posts);
      this.setState({ posts: postArray });
    });
  }

  filterPosts(receivedPost) {
    return receivedPost.map(post => {
      const postInfo = post._fields;
      const postedBy = {
        id: postInfo[0].identity.low,
        username: postInfo[0].properties.username
      };
      const postDetails = {
        id: postInfo[1].identity.low,
        title: postInfo[1].properties.title,
        content: postInfo[1].properties.text,
        upvotes: postInfo[3].low
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
    });
  }

  changeCategory(categoryValue) {
    const value = categoryValue.toLowerCase();
    if (value === "all") {
      getAllPage().then(posts => {
        // console.log("yeap");
        const postArray = this.filterPosts(posts);
        this.setState({ posts: postArray, category: categoryValue });
      });
    } else if (value === "popular") {
      getPopularPage().then(posts => {
        // console.log("here");
        const postArray = this.filterPosts(posts);
        this.setState({ posts: postArray, category: categoryValue });
      });
    } else if (value === "home") {
      getHomePage().then(posts => {
        // console.log(posts);
        const postArray = this.filterPosts(posts);
        this.setState({ posts: postArray, category: categoryValue });
      });
    }
  }

  handleSignUpOpen() {
    this.setState({ signIn: false, signUp: true, showPost: false });
  }

  handleSignInOpen() {
    this.setState({ signIn: true, signUp: false, showPost: false });
  }

  handleClose() {
    this.setState({
      signIn: false,
      signUp: false,
      showPost: false,
      postDetails: false
    });
  }

  openPost(postInfo) {
    this.setState({ showPost: true, postDetails: postInfo });
  }
  render() {
    const { signIn, signUp, showPost, postDetails } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Navbar
          changeCategory={this.changeCategory}
          handleSignUpOpen={this.handleSignUpOpen}
          handleSignInOpen={this.handleSignInOpen}
        />
        <GridContainer style={{ marginTop: 38 }} justify="center">
          <Switch>
            <Route exact path="/">
              <GridItem xs={12} md={6}>
                <PostList
                  postArray={this.state.posts}
                  openPost={this.openPost}
                />
              </GridItem>
            </Route>
            <Route path="/user">
              <GridItem xs={12} md={8}>
                <UserProfile openPost={this.openPost} />
              </GridItem>
            </Route>
            <Route path="/community">
              <GridItem xs={12} md={8}>
                <Community openPost={this.openPost} />
              </GridItem>
            </Route>
          </Switch>
        </GridContainer>
        <Dialog
          open={signIn || signUp}
          fullWidth={true}
          maxWidth="sm"
          onClose={this.handleClose}
        >
          <DialogContent>
            {signIn && (
              <SignIn
                handleClose={this.handleClose}
                handleSignUpOpen={this.handleSignUpOpen}
              />
            )}
            {signUp && (
              <SignUp
                handleClose={this.handleClose}
                handleSignInOpen={this.handleSignInOpen}
              />
            )}
          </DialogContent>
        </Dialog>
        <Dialog
          open={showPost}
          fullWidth={true}
          maxWidth="lg"
          onClose={this.handleClose}
          scroll="body"
        >
          <DialogContent classes={{ root: classes.dialogPostRoot }}>
            {showPost && (
              <PostDetails
                postInfoProp={postDetails}
                handleClose={this.handleClose}
              />
            )}
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(MainPageStyle)(MainPage);
