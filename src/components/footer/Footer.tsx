import React from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core";
import dayjs from "dayjs";

const Container = withTheme(styled.main`
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  width: 100%;
  padding: ${(props) => props.theme.spacing(2)}px ${(props) => props.theme.spacing(4)}px;
`);

const Footer: React.FC = () => (
  <Container>
    <span>© {dayjs().year()} Copyright: Guillaume Damiens</span>
  </Container>
);

export default Footer;
