import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import Navbar from "./Navbar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import PostList from "./PostList";
import PostDetails from "./PostList/PostDetails";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import FirstPageStyle from "assets/styles/containers/FirstPage/firstPageStyle";

class FirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: false,
      signUp: false,
      showPost: false,
      postDetails: null
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleSignUpOpen = this.handleSignUpOpen.bind(this);
    this.handleSignInOpen = this.handleSignInOpen.bind(this);
    this.openPost = this.openPost.bind(this);
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
    console.log(postInfo);
    this.setState({ showPost: true, postDetails: postInfo });
  }
  render() {
    const { signIn, signUp, showPost, postDetails } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Navbar
          handleSignUpOpen={this.handleSignUpOpen}
          handleSignInOpen={this.handleSignInOpen}
        />
        <GridContainer justify="center">
          <GridItem xs={12} md={6} style={{ marginTop: 38 }}>
            <PostList openPost={this.openPost} />
          </GridItem>
        </GridContainer>
        <Dialog
          open={signIn || signUp}
          fullWidth={true}
          maxWidth="sm"
          onClose={this.handleClose}
        >
          <DialogContent>
            {signIn && <SignIn handleSignUpOpen={this.handleSignUpOpen} />}
            {signUp && <SignUp handleSignInOpen={this.handleSignInOpen} />}
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
                postInfo={postDetails}
                handleClose={this.handleClose}
              />
            )}
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(FirstPageStyle)(FirstPage);
