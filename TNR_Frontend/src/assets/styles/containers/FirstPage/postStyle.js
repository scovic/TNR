import {
  primaryColor,
  secondaryColor,
  primaryIconButton,
  secondaryIconButton
} from "../../generalStyle";
const postStyle = {
  primaryIconButton,
  secondaryIconButton,
  upvotedPrimary: {
    borderRadius: "10%",
    color: primaryColor
  },
  upvotedSecondary: {
    borderRadius: "10%",
    color: secondaryColor
  },
  upvoteContainer: {
    padding: "0 6px",
    margin: "4px 0"
  },
  upvoteNumber: {
    fontSize: 14,
    fontWeight: 700
  },
  upvotesSection: {
    marginRight: "-4.5%"
  },
  contentSection: {
    marginTop: 6,
    marginLeft: "-3.0%"
  },
  opInfo: {
    padding: "3px 0",
    color: "#787c7e",
    fontSize: 12,
    fontWeight: 100
  },
  hover: {
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer"
    }
  },
  communityName: {
    color: "#000",
    fontWeight: 600
  },
  titleContainer: {
    marginTop: "10px"
  },
  textTitle: {
    fontWeight: 600,
    fontSize: "1.5rem"
  },
  textContainer: {
    marginTop: "14px"
  }
};

export default postStyle;
