import React from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NOTSIGNEDIN } from "_state/userState";
import { changeState } from "store/actions/stateActions";

import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import AccountIcon from "@material-ui/icons/PermIdentity";
import BuildIcon from "@material-ui/icons/BuildOutlined";
import InputIcon from "@material-ui/icons/Input";

import NavbarSelect from "./NavbarSelect";

import NavbarStyle from "../../../assets/styles/containers/FirstPage/navbarStyle";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null
    };
    this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
    this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleProfileMenuOpen(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleMenuClose() {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  }

  handleMobileMenuOpen(event) {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  }

  handleMobileMenuClose() {
    this.setState({ mobileMoreAnchorEl: null });
  }

  handleLogOut() {
    this.props.changeState(NOTSIGNEDIN);
    localStorage.clear();
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes, handleSignUpOpen, handleSignInOpen } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>My Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>User Settings </MenuItem>
        <MenuItem>Log Out</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountIcon />
          </IconButton>
          <p>My Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar
          classes={{
            colorPrimary: classes.appBarRoot
          }}
          color="primary"
          position="fixed"
        >
          <Toolbar variant="dense">
            <NavbarSelect
              changeCategory={this.props.changeCategory}
              userState={this.props.userState}
            />
            <div className={classes.grow} />
            {this.props.userState === NOTSIGNEDIN ? (
              <React.Fragment>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  children="Sign in"
                  onClick={handleSignInOpen}
                  classes={{
                    root: classes.buttonOver,
                    containedPrimary: classes.buttonOutlinedColorPrimary
                  }}
                />
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  children="Sign up"
                  onClick={handleSignUpOpen}
                  classes={{
                    root: classes.buttonOver,
                    containedPrimary: classes.buttonColorPrimary
                  }}
                />
              </React.Fragment>
            ) : (
              <div className={classes.sectionDesktop}>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/user"
                >
                  <IconButton
                    classes={{
                      root: classes.iconbutton
                    }}
                    color="inherit"
                  >
                    <AccountIcon />
                    <span className={classes.label}>My Profile</span>
                  </IconButton>
                </Link>
                <IconButton
                  classes={{
                    root: classes.iconbutton
                  }}
                  color="inherit"
                >
                  <BuildIcon fontSize="small" />
                  <span className={classes.label}>User Settings</span>
                </IconButton>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <IconButton
                    onClick={this.handleLogOut}
                    classes={{
                      root: classes.iconbutton
                    }}
                    color="inherit"
                  >
                    <InputIcon fontSize="small" />
                    <span className={classes.label}>Log Out</span>
                  </IconButton>
                </Link>
              </div>
            )}

            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    userState: state.userState.state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeState: changeState
    },
    dispatch
  );
}

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

export default withStyles(NavbarStyle)(Connected);
