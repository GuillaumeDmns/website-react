import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import {styled} from "@mui/material";


const Nav = styled(Link)(
    ({ theme }) =>`
  padding: 12px ${theme.spacing(1)};
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,
);

const NavText = styled('span')(`
  margin: 0px 4px 0px;
`
);

const Main = styled('div')(`
`
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    width: {
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
          <Typography variant="h6" className={classes.width}>
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
