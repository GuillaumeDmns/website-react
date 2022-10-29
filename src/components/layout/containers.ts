import { Grid, styled } from "@mui/material";

const MediaContainer = styled(Grid)(
  ({ theme }) => `
  margin: ${theme.spacing(2)};
`
);

export default MediaContainer;
