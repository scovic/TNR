import {
  buttonColorPrimary,
  buttonOutlinedColorPrimary,
  iconButton,
  primaryColor
} from "../../generalStyle";

const navbarStyle = theme => ({
  buttonColorPrimary,
  buttonOutlinedColorPrimary,
  iconButton,
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    border: "1px solid #edeff1",
    backgroundColor: "#f6f7f8",
    "&:hover": {
      backgroundColor: "#fff",
      border: "1px solid #0079d3",
      borderRadius: theme.shape.borderRadius
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 6,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  appBarRoot: {
    backgroundColor: "#fff",
    color: "#000"
  },
  inputFocused: {
    backgroundColor: "#fff",
    border: "1px solid #0079d3",
    borderRadius: theme.shape.borderRadius
  },
  buttonOver: {
    width: 120,
    padding: "5px 10px",
    marginLeft: 10
  },
  iconbutton: {
    ...iconButton,
    // ...buttonColorPrimary,
    padding: 6,
    marginLeft: 6
  },
  label: {
    fontSize: 14,
    fontWeight: 300,
    padding: "0 4px"
  }
});

export default navbarStyle;
