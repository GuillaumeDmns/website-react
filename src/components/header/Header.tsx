import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import { withTheme } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = withTheme(styled(Link)`
  padding: 0 ${(props) => props.theme.spacing(1)}px;
  font-size: 18px;
`);

const Main = styled.div``;

const Title = withTheme(styled.h2`
  flex-grow: 1;
  display: none;
  ${(props) => props.theme.breakpoints.up("sm")} {
    & {
      display: block;
    }
  }
`);

const MenuButton = withTheme(styled(IconButton)`
  margin-right: ${(props) => props.theme.spacing(2)}px;
`);

const Header: React.FunctionComponent = () => {
  return (
    <Main>
      <AppBar position="static">
        <Toolbar>
          <MenuButton edge="start" color="inherit" aria-label="open drawer"></MenuButton>
          <Title>Guillaume Damiens</Title>
          <Nav to="/">Home</Nav>
        </Toolbar>
      </AppBar>
    </Main>
  );
};

export default Header;
