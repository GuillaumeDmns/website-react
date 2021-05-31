import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Body from "components/body";
import action from "store/actions";
import { IRootState } from "store/types";
import { Line, Reseau } from "api/api.types";
import api from "api/api";
import { Grid } from "@material-ui/core";

const Home: React.FC = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [reseaux, setReseaux] = useState<Array<Reseau>>([]);
  const [selectedReseau, setSelectedReseau] = React.useState<Reseau | null>(null);
  const [lines, setLines] = useState<Array<Line>>([]);
  const [selectedLine, setSelectedLine] = React.useState<Line | null>(null);


  const isAuthenticated: boolean = useSelector((state: IRootState) => state.authentication.isAuthenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function loadReseaux() {
      if (isAuthenticated) {
        try {
          const response = await api.ratp.getReseaux();
          if (response && response.data && response.data.reseaux) {
            setReseaux(response.data.reseaux);
            setSelectedLine(null);
          }
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      }
    })();
  }, [isAuthenticated]);

  useEffect(() => {
    (async function loadLines() {
      if (selectedReseau && selectedReseau.id) {
        try {
          const response = await api.ratp.getLinesByReseauId(selectedReseau.id);
          if (response && response.data && response.data.lines) {
            setLines(response.data.lines);
          }
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      }
    })();
  }, [selectedReseau]);

  const handleClickOpenLoginDialog = () => setLoginDialogOpen(true);
  const handleClickCloseLoginDialog = () => setLoginDialogOpen(false);

  const handleSubmitLogin = () => {
    dispatch(action.authentication.loginUser(login, password));
    setLoginDialogOpen(false);
  };

  const handleLogout = () => {
    dispatch(action.authentication.logoutUser());
  };

  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Body>
      {isAuthenticated ? (
        <Grid container direction="column" spacing={2} alignItems="center">
          <Grid item>

            <Autocomplete
              value={selectedReseau}
              onChange={(event: any, newSelectedReseau: Reseau | null) => {
                setSelectedReseau(newSelectedReseau);
              }}
              style={{ width: 300 }}
              size="small"
              options={reseaux as Array<Reseau>}
              autoHighlight
              getOptionLabel={(reseau: Reseau) => reseau.name || ""}
              renderOption={(reseau: Reseau) => reseau.name || ""}
              renderInput={(params) => <TextField {...params} label="Choisissez un réseau" variant="outlined" />}
            />
          </Grid>

          <Grid item>
            <Autocomplete
              value={selectedLine}
              onChange={(event: any, newSelectedLine: Reseau | null) => {
                setSelectedLine(newSelectedLine);
              }}
              style={{ width: 300 }}
              size="small"
              options={lines as Array<Line>}
              autoHighlight
              getOptionLabel={(line: Line) => line.name || ""}
              renderOption={(line: Line) => line.name || ""}
              renderInput={(params) => <TextField {...params} label="Choisissez une ligne" variant="outlined" />}
              disabled={!selectedReseau}
            />
          </Grid>
          <Grid item>
            <Button size="medium" variant="outlined" color="primary" onClick={handleLogout}>
              Se déconnecter
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Button size="medium" variant="outlined" color="primary" onClick={handleClickOpenLoginDialog}>
          Se connecter
        </Button>
      )}

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
