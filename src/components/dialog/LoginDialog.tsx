import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";

import action from "store/actions";

dayjs.extend(relativeTime);
dayjs.locale("fr");

type Props = {
  loginDialogOpen: boolean;
  setLoginDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginDialog: React.FC<Props> = ({ loginDialogOpen, setLoginDialogOpen }) => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();

  const handleClickCloseLoginDialog = () => setLoginDialogOpen(false);

  const handleSubmitLogin = () => {
    dispatch(action.authentication.loginUser(login, password));
    setLoginDialogOpen(false);
  };

  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
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
  );
};

export default LoginDialog;
