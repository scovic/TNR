const actionStyle = {
  hoverActionContainer: {
    "&:hover": {
      backgroundColor: "#e2e2e2",
      cursor: "pointer"
    }
  },
  nohover: {
    "&:hover": { cursor: "default" }
  },
  actionContainer: {
    padding: "4px 4px",
    borderRadius: 4
  },
  actionLabel: {
    marginLeft: 4
  }
};

export default actionStyle;
