import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
// import Icon from "@material-ui/core/Icon";

// import MenuIcon from "@material-ui/icons/Menu";

import NavbarSelectStyle from "../../../assets/styles/containers/FirstPage/navbarSelectStyle";

class NavbarSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showByCategory: "popular"
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
            <MenuItem
              onClick={() => alert("yes")}
              classes={{ root: classes.menuItemRoot }}
              value="popular"
            >
              Popular
            </MenuItem>
            <MenuItem classes={{ root: classes.menuItemRoot }} value="All">
              All
            </MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(NavbarSelectStyle)(NavbarSelect);
