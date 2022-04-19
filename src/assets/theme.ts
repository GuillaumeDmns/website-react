import { createTheme } from "@mui/material";

import colors from "./colors";
import fonts from "./styles/fonts";


const theme = createTheme({
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
});

export default theme;
