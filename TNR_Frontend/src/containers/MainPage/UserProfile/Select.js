import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import NavbarSelectStyle from "../../../assets/styles/containers/FirstPage/navbarSelectStyle";

class NavbarSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.select(event.target.value);
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
            value={this.props.selectedItem}
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
            {this.props.children}
          </Select>
        </FormControl>
      </form>
    );
  }
}

NavbarSelect.defaultProps = {
  selectedItem: ""
};

export default withStyles(NavbarSelectStyle)(NavbarSelect);
