import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";

const Nav = styled(Link)(
  ({ theme }) => `
  padding: 12px ${theme.spacing(1)};
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
);

const NavText = styled("span")(`
  margin: 0px 8px 0px;
`);

const Header: React.FunctionComponent = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Guillaume Damiens
          </Typography>
          <Nav to="/">
            <HomeOutlinedIcon />
            <NavText>HOME</NavText>
          </Nav>
          <Nav to="/photos">
            <PhotoCameraOutlinedIcon />
            <NavText>PHOTOS</NavText>
          </Nav>
          <Nav to="/videos">
            <MovieCreationOutlinedIcon />
            <NavText>VIDÉOS</NavText>
          </Nav>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
