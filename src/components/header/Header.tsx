import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
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
      <AppBar 
        position="fixed" 
        sx={{ 
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h5"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.025em",
                color: "inherit",
                textDecoration: "none",
                background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Guillaume Damiens
            </Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <nav style={{ display: "flex", gap: "1.5rem" }}>
                {headerLinks.map((link) => (
                  <Link
                    key={link.name}
                    component={RouterLink}
                    to={link.path}
                    sx={{ 
                      color: "text.primary",
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      opacity: 0.8,
                      "&:hover": { opacity: 1, color: "primary.light" }
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <Button
                color="primary"
                variant={isAuthenticated ? "outlined" : "contained"}
                onClick={isAuthenticated ? handleLogout : handleClickOpenLoginDialog}
                sx={{ ml: 2 }}
              >
                {isAuthenticated ? "Deconnexion" : "Connexion"}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <LoginDialog loginDialogOpen={loginDialogOpen} setLoginDialogOpen={setLoginDialogOpen} />
    </>
  );
};

export default Header;
