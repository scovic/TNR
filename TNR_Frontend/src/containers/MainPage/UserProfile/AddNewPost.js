import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";

import Select from "./Select";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

import AddNewPostStyle from "../../../assets/styles/containers/FirstPage/signInStyle";

const mockCommunities = [
  { name: "com1" },
  { name: "com2" },
  { name: "com3" },
  { name: "com4" }
];

class AddNewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      community: "",
      subCommunities: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddPost = this.handleAddPost.bind(this);
    this.selectCommunity = this.selectCommunity.bind(this);
  }

  componentDidMount() {
    this.setState({
      subCommunities: mockCommunities,
      community: mockCommunities[0].name
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  selectCommunity(selectedValue) {
    this.setState({ community: selectedValue });
  }

  handleAddPost() {
    const { title, content, community } = this.state;
    console.log(title);
    console.log(content);
    console.log(community);
  }

  render() {
    const { classes } = this.props;
    const { subCommunities, community } = this.state;
    return (
      <GridContainer justify="center">
        <GridItem xs={8}>
          <Typography classes={{ root: classes.header }} variant="h6">
            Write a Post
          </Typography>
          <Select selectedItem={community} select={this.selectCommunity}>
            {subCommunities.length > 0
              ? mockCommunities.map((community, index) => {
                  return (
                    <MenuItem
                      key={index}
                      classes={{ root: classes.menuItemRoot }}
                      value={community.name}
                      children={
                        community.name.charAt(0).toUpperCase() +
                        community.name.slice(1)
                      }
                    />
                  );
                })
              : null}
          </Select>
          <TextField
            fullWidth
            required
            label="Title"
            name="title"
            className={classes.textField}
            margin="dense"
            variant="outlined"
            onChange={this.handleChange}
          />
          <TextField
            fullWidth
            required
            multiline
            label="Content"
            name="content"
            className={classes.textField}
            margin="dense"
            variant="outlined"
            onChange={this.handleChange}
            rows={7}
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
              children="Add Post"
              onClick={this.handleAddPost}
            />
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(AddNewPostStyle)(AddNewPost);
