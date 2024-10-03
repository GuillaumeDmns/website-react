import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "store/types";
import action from "store/actions";
import LoginDialog from "../dialog";

const headerLinks = [
  { name: "Home", path: "/" },
  { name: "Photos", path: "/photos" },
  { name: "Vidéos", path: "/videos" },
];

const Header: React.FunctionComponent = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const isAuthenticated: boolean = useSelector((state: IRootState) => state.authentication.isAuthenticated);
  const dispatch = useDispatch();

  const handleClickOpenLoginDialog = () => setLoginDialogOpen(true);

  const handleLogout = () => {
    dispatch(action.authentication.logoutUser());
  };

  return (
    <>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }} />
      <CssBaseline />
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }} textAlign="left">
            Guillaume Damiens
          </Typography>
          <nav>
            {headerLinks.map((link) => (
              <Link
                key={link.name}
                variant="button"
                color="text.primary"
                component={RouterLink}
                underline="none"
                to={link.path}
                sx={{ my: 1, mx: 1.5 }}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <Button
            href="#"
            color="inherit"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={isAuthenticated ? handleLogout : handleClickOpenLoginDialog}
          >
            {isAuthenticated ? "SE DÉCONNECTER" : "SE CONNECTER"}
          </Button>
        </Toolbar>
      <LoginDialog loginDialogOpen={loginDialogOpen} setLoginDialogOpen={setLoginDialogOpen} />
    </>
  );
};

export default Header;
