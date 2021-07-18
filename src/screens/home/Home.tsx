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
import { Grid } from "@material-ui/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import { ForceGraph2D } from "react-force-graph";

import Body from "components/body";
import action from "store/actions";
import { IRootState } from "store/types";
import { MissionCustom, RATPLine, RATPReseau, RATPStation } from "api/api.types";
import api from "api/api";
import { GraphData } from "utils/types.utils";

dayjs.extend(relativeTime);
dayjs.locale("fr");

const Home: React.FC = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [reseaux, setReseaux] = useState<Array<RATPReseau>>([]);
  const [selectedReseau, setSelectedReseau] = React.useState<RATPReseau | null>(null);
  const [lines, setLines] = useState<Array<RATPLine>>([]);
  const [selectedLine, setSelectedLine] = React.useState<RATPLine | null>(null);
  const [stations, setStations] = useState<Array<RATPStation>>([]);
  const [selectedStation, setSelectedStation] = React.useState<RATPStation | null>(null);
  const [nextMissions, setNextMissions] = React.useState<Array<MissionCustom>>([]);
  const [displayGraph, setDisplayGraph] = React.useState<boolean>(true);
  const [graphData, setGraphData] = React.useState<GraphData>({ nodes: [], links: [] });

  const isAuthenticated: boolean = useSelector((state: IRootState) => state.authentication.isAuthenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function loadReseaux() {
      if (isAuthenticated) {
        try {
          const response = await api.ratp.getReseaux();
          if (response && response.data && response.data.reseaux) {
            setSelectedLine(null);
            setSelectedStation(null);
            setNextMissions([]);
            setReseaux(response.data.reseaux);
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
            setSelectedStation(null);
            setNextMissions([]);
            setLines(response.data.lines);
          }
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      }
    })();
  }, [selectedReseau]);

  useEffect(() => {
    (async function loadStations() {
      if (selectedReseau && selectedReseau.id && selectedLine && selectedLine.id) {
        try {
          const response = await api.ratp.getStationsByLineIdAndStationName(selectedLine.id, "*");
          if (response && response.data && response.data.stations) {
            setNextMissions([]);
            setStations(response.data.stations);
          }
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      }
    })();
  }, [selectedReseau, selectedLine]);

  const getStations = async () => {
    if (selectedReseau && selectedReseau.id && selectedLine && selectedLine.id && selectedStation && selectedStation.id) {
      try {
        const response = await api.ratp.getNextMissionsByLineAndStation(selectedLine.id, selectedStation.id);
        if (response && response.data && response.data.nextMissions) {
          setNextMissions(response.data.nextMissions);
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
    }
  };

  useEffect(() => {
    (async function loadGraph() {
      if (displayGraph) {
        try {
          const response = await api.ratp.getFullMissionByLine("M3");
          if (response && response.data) {
            setGraphData({
              nodes:
                response.data.stationsDTO?.stations?.map((station) => {
                  return {
                    id: station.id || "",
                    name: station.name || "",
                    val: 1,
                  };
                }) || [],
              links:
                response.data.links?.map((link) => {
                  return {
                    source: link.first || "",
                    target: link.second || "",
                  };
                }) || [],
            });
          }
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      }
    })();
  }, [displayGraph]);

  useEffect(() => {
    (async function loadStations() {
      await getStations();
    })();
    // eslint-disable-next-line
  }, [selectedReseau, selectedLine, selectedStation]);

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

  const handleChangeGraphStatus = () => {
    setDisplayGraph(!displayGraph);
  };

  //   const graphData = {
  //     "nodes": [
  //       {
  //         "id": "id1",
  //         "name": "name1",
  //         "val": 1
  //       },
  //       {
  //         "id": "id2",
  //         "name": "name2",
  //         "val": 10
  //       },
  //     ],
  //     "links": [
  //       {
  //         "source": "id1",
  //         "target": "id2"
  //       },
  //     ]
  // }

  return (
    <Body>
      {isAuthenticated ? (
        <Grid container direction="column" spacing={2} alignItems="center">
          <Grid item>
            <Autocomplete
              value={selectedReseau}
              onChange={(event: any, newSelectedReseau: RATPReseau | null) => {
                setSelectedStation(null);
                setSelectedLine(null);
                setSelectedReseau(newSelectedReseau);
              }}
              style={{ width: 300 }}
              size="small"
              options={reseaux as Array<RATPReseau>}
              autoHighlight
              getOptionLabel={(reseau: RATPReseau) => reseau.name || ""}
              renderOption={(reseau: RATPReseau) => reseau.name || ""}
              renderInput={(params) => <TextField {...params} label="Choisissez un réseau" variant="outlined" />}
            />
          </Grid>

          {selectedReseau && (
            <Grid item>
              <Autocomplete
                value={selectedLine}
                onChange={(event: any, newSelectedLine: RATPReseau | null) => {
                  setSelectedStation(null);
                  setSelectedLine(newSelectedLine);
                }}
                style={{ width: 300 }}
                size="small"
                options={lines as Array<RATPLine>}
                autoHighlight
                getOptionLabel={(line: RATPLine) => (line.code ? `${line.code} : ` : "") + line.name || ""}
                renderOption={(line: RATPLine) => (line.code ? `${line.code} : ` : "") + line.name || ""}
                renderInput={(params) => <TextField {...params} label="Choisissez une ligne" variant="outlined" />}
              />
            </Grid>
          )}

          {selectedReseau && selectedLine && (
            <Grid item>
              <Autocomplete
                value={selectedStation}
                onChange={(event: any, newSelectedStation: RATPStation | null) => {
                  setSelectedStation(newSelectedStation);
                }}
                style={{ width: 300 }}
                size="small"
                options={stations as Array<RATPStation>}
                autoHighlight
                getOptionLabel={(station: RATPStation) => station.name || ""}
                renderOption={(station: RATPStation) => station.name || ""}
                renderInput={(params) => <TextField {...params} label="Choisissez une station/arrêt" variant="outlined" />}
              />
            </Grid>
          )}

          {selectedReseau && selectedLine && selectedStation && (
            <Grid item container direction="column" spacing={2} alignItems="center">
              {nextMissions.length > 0 ? (
                nextMissions.map((mission: MissionCustom) => (
                  <Grid key={`${mission.direction}-${mission.nextPassage}-${mission.messages}`} item>
                    Direction <b>{mission.direction}</b> :{" "}
                    {mission.messages ? mission.messages : dayjs(mission.nextPassage, "YYYYMMDDHHmm").fromNow()} (
                    {dayjs(mission.nextPassage, "YYYYMMDDHHmm").format("HH:mm")})
                  </Grid>
                ))
              ) : (
                <p>Pas de prochains départs prévus !</p>
              )}
            </Grid>
          )}

          {displayGraph && (
            <Grid item>
              <ForceGraph2D graphData={graphData} width={900} height={700} />
            </Grid>
          )}

          <Grid item container justify="center" spacing={2}>
            {selectedReseau && selectedLine && selectedStation && (
              <Grid item>
                <Button size="medium" variant="outlined" color="primary" onClick={getStations}>
                  Recharger
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button size="medium" variant="outlined" color="primary" onClick={handleChangeGraphStatus}>
                Graph
              </Button>
            </Grid>
            <Grid item>
              <Button size="medium" variant="outlined" color="primary" onClick={handleLogout}>
                Se déconnecter
              </Button>
            </Grid>
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
