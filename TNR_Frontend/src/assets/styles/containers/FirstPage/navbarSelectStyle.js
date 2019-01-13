const NavbarSelectStyle = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 240,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  inputMarginDense: {
    paddingTop: 8,
    paddingBottom: 8
  },
  iconSelect: {
    // marginLeft: -4,
    marginRight: 10
  },
  menuItemRoot: {
    color: "rgba(0, 0, 0, 0.87)",
    width: "auto",
    height: 14,
    overflow: "hidden",
    fontSize: "1rem",
    boxSizing: "content-box",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    whiteSpace: "nowrap",
    "&:hover": {
      backgroundColor: "#f6f7f8"
    }
  }
});

export default NavbarSelectStyle;
