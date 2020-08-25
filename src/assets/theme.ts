import { createMuiTheme } from "@material-ui/core/styles";

import colors from "./colors";
import fonts from "./styles/fonts";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    tonalOffset: 0.05,
    action: {},
  },
  typography: {
    fontFamily: [fonts.montserrat, "-apple-system", '"Segoe UI"', "Roboto", "Arial", "sans-serif"].join(","),
  },
  overrides: {},
});

export default theme;
