import PostStyles from "./postStyle";
import {
  iconButton,
  primaryColor,
  buttonColorPrimary
} from "../../generalStyle";

const PostDetailsStyle = {
  ...PostStyles,
  primaryColor,
  buttonColorPrimary,
  closeIcon: {
    ...iconButton,
    padding: 4,
    fontSize: "1rem",
    color: "inherit"
  },
  header: {
    backgroundColor: primaryColor,
    color: "#fff",
    padding: "10px 15px"
  },
  headerTitle: {
    fontSize: "1.1rem"
  },
  padLeft: {
    paddingLeft: "10px"
  },
  padRight: {
    paddingRight: "10px"
  },
  comments: {
    margin: "6px 0"
  },
  buttonOver: {
    width: 120,
    padding: "5px 10px",
    marginTop: 3
  },
  commentSection: {
    margin: "10px 0"
  },
  communityList: {
    listStyleType: "none"
  },
  listItem: {
    padding: 5
  }
};

export default PostDetailsStyle;
