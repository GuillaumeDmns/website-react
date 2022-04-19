import React from "react";
import {styled} from "@mui/material";
import CURRENT_YEAR from "utils/date.utils";


const Container = styled('main')(
    ({ theme }) =>`
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  width: 100%;
  padding: ${theme.spacing(2)} ${theme.spacing(4)};
`,
);

const Footer: React.FC = () => (
  <Container>
    <span>© {CURRENT_YEAR} Copyright: Guillaume Damiens</span>
  </Container>
);

export default Footer;
