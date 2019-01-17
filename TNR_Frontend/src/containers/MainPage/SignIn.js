import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { signIn } from "services/auth.service.js";
import { changeState } from "store/actions/stateActions";
import { SIGNEDIN } from "_state/userState";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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
    this.clear = this.clear.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  clear() {
    this.setState({ username: "", password: "" });
  }

  handleSignIn() {
    const { username, password } = this.state;
    signIn(username, password).then(result => {
      if (result) {
        this.props.changeUserState(SIGNEDIN);
        this.props.handleClose();
      } else {
        this.clear();
      }
    });
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
            value={this.state.username}
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
            value={this.state.password}
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
function mapStateToProps(state) {
  return {
    userState: state.userState
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeUserState: changeState
    },
    dispatch
  );
}

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

export default withStyles(SingInStyle)(Connected);
