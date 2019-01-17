import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { getUserCommunities, addNewPost } from "services/general.service";

import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";

import Select from "./Select";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

import AddNewPostStyle from "../../../assets/styles/containers/FirstPage/signInStyle";

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
    getUserCommunities().then(res => {
      const communities = this.filterResponse(res);
      if (communities.length > 0) {
        this.setState({
          subCommunities: communities,
          community: communities[0].name
        });
      }
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  filterResponse(resp) {
    return resp.map(comm => {
      const communityInfo = comm._fields;
      return {
        id: communityInfo[0].identity.low,
        name: communityInfo[0].properties.title
      };
    });
  }

  selectCommunity(selectedValue) {
    this.setState({ community: selectedValue });
  }

  handleAddPost() {
    const { title, content, community } = this.state;
    if (community.length > 0) {
      const objToSend = {
        post: {
          title: title,
          text: content
        },
        community: {
          title: community
        }
      };

      addNewPost(objToSend);
      this.props.handleClose();
    }
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
              ? subCommunities.map((community, index) => {
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
          {this.state.subCommunities.length > 0 ? (
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
          ) : (
            <h5>You should subscribe to some communities, it's fun!</h5>
          )}
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(AddNewPostStyle)(AddNewPost);
