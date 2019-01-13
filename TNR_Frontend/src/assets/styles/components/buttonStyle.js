import { primaryColor, primaryColorHover } from "../generalStyle";

const ButtonStyle = {
  button: {
    margin: 8
  },
  buttonRoot: {
    width: 140
  },
  buttonColorPrimary: {
    backgroundColor: primaryColor,
    "&:hover": {
      backgroundColor: primaryColorHover
    }
  }
};

export default ButtonStyle;
