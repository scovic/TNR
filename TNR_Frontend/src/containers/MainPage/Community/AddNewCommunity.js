import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import AddNewCommunityStyle from "../../../assets/styles/containers/FirstPage/signInStyle";

class AddNewCommunity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateCommunity = this.handleCreateCommunity.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCreateCommunity() {
    console.log(this.state.name);
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={8}>
          <Typography classes={{ root: classes.header }} variant="h6">
            Create a Community
          </Typography>
          <TextField
            fullWidth
            required
            label="Community Name"
            name="name"
            className={classes.textField}
            margin="dense"
            variant="outlined"
            onChange={this.handleChange}
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
              children="Create It"
              onClick={this.handleCreateCommunity}
            />
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(AddNewCommunityStyle)(AddNewCommunity);
