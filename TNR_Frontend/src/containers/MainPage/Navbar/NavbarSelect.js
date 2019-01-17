import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import NavbarSelectStyle from "../../../assets/styles/containers/FirstPage/navbarSelectStyle";

const loggedIn = true;

class NavbarSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showByCategory: loggedIn ? "home" : "popular"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { classes } = this.props;
    return (
      <form>
        <FormControl
          margin="dense"
          variant="filled"
          className={classes.formControl}
        >
          <Select
            value={this.state.showByCategory}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                labelWidth={0}
                margin="dense"
                classes={{ inputMarginDense: classes.inputMarginDense }}
                name="showByCategory"
              />
            }
          >
            {loggedIn ? (
              <MenuItem classes={{ root: classes.menuItemRoot }} value="home">
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Home
                </Link>
              </MenuItem>
            ) : null}

            <MenuItem classes={{ root: classes.menuItemRoot }} value="popular">
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Popular
              </Link>
            </MenuItem>
            <MenuItem classes={{ root: classes.menuItemRoot }} value="All">
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                All
              </Link>
            </MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(NavbarSelectStyle)(NavbarSelect);
