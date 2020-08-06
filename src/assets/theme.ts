import { createMuiTheme } from "@material-ui/core/styles";

import colors from "./colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.blue,
    },
    secondary: {
      main: colors.nickel,
    },
    tonalOffset: 0.05,
    action: {},
  },
  overrides: {},
});

export default theme;
