import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { CircularProgress, Grid } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import { ForceGraph2D } from "react-force-graph";

import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import Body from "components/body";
import action from "store/actions";
import { IRootState } from "store/types";
import { MissionCustom, RATPLine, RATPReseau, RATPStation } from "api/api.types";
import api from "api/api";
import { GraphData } from "utils/types.utils";
import LoginDialog from "components/dialog";

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
// mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

dayjs.extend(relativeTime);
dayjs.locale("fr");
mapboxgl.accessToken = "pk.eyJ1IjoiZ3VpbGxhdW1lZG1ucyIsImEiOiJja3Y5ejdtYjMwYTJuMzFwZ292eTZtbHE5In0.d3ZU8GezLxJHmfZsfYgqbw";

const MainMapContainer = styled.div`
  height: 500px;
  width: 800px;
`;

const Home: React.FC = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const [reseaux, setReseaux] = useState<Array<RATPReseau>>([]);
  const [selectedReseau, setSelectedReseau] = React.useState<RATPReseau | null>(null);
  const [lines, setLines] = useState<Array<RATPLine>>([]);
  const [selectedLine, setSelectedLine] = React.useState<RATPLine | null>(null);
  const [stations, setStations] = useState<Array<RATPStation>>([]);
  const [selectedStation, setSelectedStation] = React.useState<RATPStation | null>(null);
  const [nextMissions, setNextMissions] = React.useState<Array<MissionCustom>>([]);
  const [displayGraph, setDisplayGraph] = React.useState<boolean>(true);
  const [graphData, setGraphData] = React.useState<GraphData>({ nodes: [], links: [] });
  const [isGraphLoading, setIsGraphLoading] = React.useState<boolean>(false);

  const isAuthenticated: boolean = useSelector((state: IRootState) => state.authentication.isAuthenticated);

  const dispatch = useDispatch();

  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [lng] = useState(2.349014);
  const [lat] = useState(48.864716);
  const [zoom] = useState(11);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom,
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

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
      if (selectedReseau && selectedReseau.id && selectedLine && selectedLine.id && displayGraph) {
        setIsGraphLoading(true);
        try {
          const response = await api.ratp.getFullMissionByLine(selectedLine.id);
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
                    source: link.left || "",
                    target: link.middle || "",
                    value: link.right || 0,
                  };
                }) || [],
            });
          }
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
        setIsGraphLoading(false);
      }
    })();
  }, [displayGraph, selectedReseau, selectedLine]);

  useEffect(() => {
    (async function loadStations() {
      await getStations();
    })();
    // eslint-disable-next-line
  }, [selectedReseau, selectedLine, selectedStation]);

  const handleClickOpenLoginDialog = () => setLoginDialogOpen(true);

  const handleLogout = () => {
    dispatch(action.authentication.logoutUser());
  };

  const handleChangeGraphStatus = () => {
    setDisplayGraph(!displayGraph);
  };

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

          {selectedReseau && selectedLine && displayGraph && (
            <Grid item>
              {isGraphLoading ? (
                <CircularProgress />
              ) : (
                <ForceGraph2D graphData={graphData} width={900} height={700} linkDirectionalParticles="value" backgroundColor="#DCDCDC" />
              )}
            </Grid>
          )}

          <Grid item container justifyContent="center" spacing={2}>
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
          <Grid item container justifyContent="center" spacing={2}>
            <Grid item>
              <MainMapContainer ref={mapContainer} className="map-container" />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Button size="medium" variant="outlined" color="primary" onClick={handleClickOpenLoginDialog}>
          Se connecter
        </Button>
      )}

      <LoginDialog loginDialogOpen={loginDialogOpen} setLoginDialogOpen={setLoginDialogOpen} />
    </Body>
  );
};

export default Home;
