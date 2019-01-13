import React from "react";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import Navbar from "./Navbar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import Post from "./PostList/Post";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

class FirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: false,
      signUp: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleSignUpOpen = this.handleSignUpOpen.bind(this);
    this.handleSignInOpen = this.handleSignInOpen.bind(this);
  }

  handleSignUpOpen() {
    this.setState({ signIn: false, signUp: true });
  }

  handleSignInOpen() {
    this.setState({ signIn: true, signUp: false });
  }

  handleClose() {
    this.setState({ signIn: false, signUp: false });
  }
  render() {
    const { signIn, signUp } = this.state;
    return (
      <div>
        <Navbar
          handleSignUpOpen={this.handleSignUpOpen}
          handleSignInOpen={this.handleSignInOpen}
        />
        <GridContainer justify="center">
          <GridItem xs={12} md={6}>
            <Post />
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
      </div>
    );
  }
}

export default FirstPage;
