import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import SingInStyle from "../../assets/styles/containers/FirstPage/signInStyle";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSignIn() {
    const { username, password } = this.state;
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.handleSignIn();
    }
  }

  render() {
    const { classes, handleSignUpOpen } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={8}>
          <Typography classes={{ root: classes.header }} variant="h6">
            Sign in
          </Typography>
          <TextField
            fullWidth
            required
            label="Username"
            name="username"
            className={classes.textField}
            margin="dense"
            variant="outlined"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <TextField
            fullWidth
            required
            type="password"
            label="Password"
            name="password"
            className={classes.textField}
            margin="dense"
            variant="outlined"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <div className={classes.fullWidth}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              classes={{
                root: classes.buttonRoot,
                containedPrimary: classes.buttonColorPrimary
              }}
              children="Sign In"
              onClick={this.handleSignIn}
            />
          </div>
          <div className={classes.fullWidth}>
            <p className={classes.text}>
              New to TNR?
              <Button
                color="primary"
                classes={{ textPrimary: classes.textButton }}
                children="sign up"
                onClick={handleSignUpOpen}
              />
            </p>
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(SingInStyle)(SignIn);
