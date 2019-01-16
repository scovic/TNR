import PostDetailsStyle from "./postDetailsStyle";
import { primaryColor } from "../../generalStyle";

const CommentStyle = {
  ...PostDetailsStyle,
  commentOp: {
    color: primaryColor,
    fontSize: "0.8rem"
  },
  commentContainer: {
    marginTop: 14,
    marginBottom: 8,
    width: "100%"
  },
  commentContentContainer: {
    paddingTop: 10,
    paddingRight: 8
  },
  commentContent: {
    color: "#000",
    fontWeight: 400,
    fontSize: "0.9rem"
  }
};

export default CommentStyle;
