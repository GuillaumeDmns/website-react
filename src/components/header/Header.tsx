import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import MovieCreationOutlinedIcon from "@material-ui/icons/MovieCreationOutlined";
import { createStyles, makeStyles, Theme, withTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

const Nav = withTheme(styled(Link)`
  padding: 12px ${(props) => props.theme.spacing(1)}px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`);

const NavText = styled.span`
  margin: 0px 4px 0px;
`;

const Main = styled.div``;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Header: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Main>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Guillaume Damiens
          </Typography>
          <Nav to="/">
            <HomeOutlinedIcon />
            <NavText>Home</NavText>
          </Nav>
          <Nav to="/photos">
            <PhotoCameraOutlinedIcon />
            <NavText>Photos</NavText>
          </Nav>
          <Nav to="/videos">
            <MovieCreationOutlinedIcon />
            <NavText>Vidéos</NavText>
          </Nav>
        </Toolbar>
      </AppBar>
    </Main>
  );
};

export default Header;
