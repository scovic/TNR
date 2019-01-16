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
    marginLeft: "-4.0%"
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
  },
  actionsContainer: {
    color: "#878a8c",
    display: "flex",
    flexDirection: "row",
    height: 24,
    padding: "4px 8px 4px 0",
    fontSize: 12,
    fontWeight: 700
  },
  actionIcon: {
    fontSize: 16,
    marginBottom: -4
  },
  onePost: {
    "&:hover": {
      border: "1px solid #000",
      cursor: "pointer"
      // padding: 0,
      // margin: 0
    }
  }
};

export default postStyle;
