import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Body from "components/body";
import api from "api/api";
import LOCAL_STORAGE from "utils/authentication.utils";

const Home: React.FC = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleClickOpenLoginDialog = () => setLoginDialogOpen(true);
  const handleClickCloseLoginDialog = () => setLoginDialogOpen(false);

  const handleSubmitLogin = async () => {
    api.authentication.signIn(login, password).then((value: string) => localStorage.setItem(LOCAL_STORAGE.JWT, value));
  };

  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Body>
      <Button size="medium" variant="outlined" color="primary" onClick={handleClickOpenLoginDialog}>
        Se connecter
      </Button>
      <Dialog open={loginDialogOpen} onClose={handleClickCloseLoginDialog} aria-labelledby="form-dialog-title">
        <DialogTitle>Connexion</DialogTitle>
        <DialogContent>
          <DialogContentText>Entrez vos identifiants pour vous connecter</DialogContentText>
          <TextField value={login} margin="dense" label="Username" type="text" fullWidth onChange={handleChangeLogin} />
          <TextField value={password} margin="dense" label="Mot de passe" type="password" fullWidth onChange={handleChangePassword} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseLoginDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSubmitLogin} color="primary">
            Se connecter
          </Button>
        </DialogActions>
      </Dialog>
    </Body>
  );
};

export default Home;
