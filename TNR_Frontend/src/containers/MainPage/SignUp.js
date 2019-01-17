import React from "react";
import withStyle from "@material-ui/core/styles/withStyles";
import { signUp } from "services/auth.service";

import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import SignUpStyle from "../../assets/styles/containers/FirstPage/signUpStyle";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSignUp() {
    const { email, username, password } = this.state;
    signUp(username, password, email).then(() => this.props.handleClose());
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.handleSignUp();
    }
  }

  render() {
    const { classes, handleSignInOpen } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={8}>
          <Typography classes={{ root: classes.header }} variant="h6">
            Sign up
          </Typography>
          <TextField
            fullWidth
            required
            label="Email"
            name="email"
            placeholder="example@example.com"
            className={classes.textField}
            margin="dense"
            variant="outlined"
            onChange={this.handleChange}
          />
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
            label="Password"
            name="password"
            type="password"
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
              children="Sign Up"
              onClick={this.handleSignUp}
            />
          </div>
          <div className={classes.fullWidth}>
            <p className={classes.text}>
              Already have an account?
              <Button
                color="primary"
                classes={{ textPrimary: classes.textButton }}
                children="sign in"
                onClick={handleSignInOpen}
              />
            </p>
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyle(SignUpStyle)(SignUp);
